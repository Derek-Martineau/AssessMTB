import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";

function PostResults() {
  const [movingTime, setMovingTime] = useState("");
  const [confirmedMovingTime, setConfirmedMovingTime] = useState("");
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { assessmentId } = useParams();
  const [redirectToWillowdale, setRedirectToWillowdale] = useState(false);
  const [featureLines, setFeatureLines] = useState([]); // Define featureLines in the component's state

  const calculateScore = () => {
    if (confirmedMovingTime && featureLines.length > 0) {
      const movingTimeInSeconds = convertMovingTimeToSeconds(confirmedMovingTime);
      console.log("Moving Time in Seconds:", movingTimeInSeconds);
  
      // Calculate the lineTotal by summing up the lineChoice values in featureLines
      const lineTotal = featureLines.reduce((total, line) => total + parseInt(line.lineChoice, 10), 0);
      console.log("Total Line Choice Score:", lineTotal);
  
      const maxMovingTime = 300; // You can adjust this value
      const maxLineTotal = 48; // Maximum total for lineChoice
  
      // Calculate scores based on your criteria
      const movingTimeScore = 100 - (movingTimeInSeconds / maxMovingTime) * 100;
      console.log("Moving Time Score:", movingTimeScore);
  
      const lineTotalScore = (lineTotal / maxLineTotal) * 100;
      console.log("Line Choice Score:", lineTotalScore);
  
      // Calculate the final score by summing the two scores
      const finalScore = movingTimeScore + lineTotalScore;
      setScore(finalScore.toFixed(2)); // Convert to a string with 2 decimal places
      console.log("Calculated Score:", finalScore); // Log the final score here
    }
  };

  useEffect(() => {
    async function fetchAssessmentData() {
      try {
        const response = await fetch(`http://localhost:8081/api/results/${assessmentId}`);
        if (response.ok) {
          const assessmentData = await response.json();
          if (assessmentData.featureLines) {
            setFeatureLines(assessmentData.featureLines); // Set featureLines from the data
            calculateScore(); // Calculate the score after setting featureLines
          }
        } else {
          console.error("Error fetching assessment data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching assessment data:", error);
      }
    }
    fetchAssessmentData();
  }, [assessmentId, calculateScore]);
  

  const handleMovingTimeChange = (e) => {
    setMovingTime(e.target.value);
  };

  const convertMovingTimeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":");
    return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  };

  const handleConfirmClick = () => {
    setConfirmedMovingTime(movingTime);
    console.log("Confirmed Moving Time:", movingTime);
    calculateScore(); // Calculate the score when the user confirms moving time.
  };

  const handleNextClick = async () => {
    if (confirmedMovingTime) {
      const scoreToSend = parseFloat(score);
  
      try {
        // Send the score to the server and update the MongoDB document
        const response = await fetch(`http://localhost:8081/api/results/${assessmentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Score: scoreToSend }),
        });
  
        if (response.ok) {
          console.log("Assessment updated successfully!");
  
          // Show a success notification
          alert("Assessment updated successfully!");
  
          // Navigate to /willowdale immediately after the alert is closed
          window.location.href = "/willowdale";
        } else {
          console.error("Error updating assessment:", response.status);
          // Handle the error, e.g., show an error message to the user.
        }
      } catch (error) {
        console.error("Error updating assessment:", error);
        // Handle the error, e.g., show an error message to the user.
      }
    } else {
      alert("Please enter and confirm the average moving time.");
    }
  };
  
  const handleDiscardClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    try {
      // Send a DELETE request to delete the assessment
      const response = await fetch(`http://localhost:8081/api/results/${assessmentId}`, {
        method: "DELETE",
      });
  
      if (response.status === 204) {
        // The assessment was successfully deleted
        console.log("Assessment deleted successfully!");
  
        // Show a success notification (you can use a different message here)
        alert("Assessment deleted successfully!");
  
        // Navigate to /willowdale after deleting the assessment
        setRedirectToWillowdale(true);
        setShowModal(false);
      } else if (response.status === 404) {
        // Assessment not found
        console.error("Result not found");
        alert("Assessment not found");
        setShowModal(false);
      } else {
        // Server error
        console.error("Server error");
        alert("Server error");
        setShowModal(false);
      }
    } catch (error) {
      // Handle any other errors that occur during the DELETE request
      console.error("Error deleting assessment:", error);
      alert("Error deleting assessment");
      setShowModal(false);
    }
  };
  
  const handleModalCancel = () => {
    setShowModal(false);
  };

  if (redirectToWillowdale) {
    return <Navigate to="/willowdale" />;
  }

  return (
    <div style={{ background: "#5A5A5A", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "45rem" }}>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card.Title>Results</Card.Title>
          </div>
          {confirmedMovingTime ? (
            <div>
              <strong>Moving Time:</strong> {confirmedMovingTime}
            </div>
          ) : (
            <Form>
              <Form.Group controlId="movingTime">
                <Form.Label>Enter The Total Moving Time</Form.Label>
                <Form.Control type="text" value={movingTime} onChange={handleMovingTimeChange} />
              </Form.Group>
            </Form>
          )}
          {!confirmedMovingTime ? (
            <Button variant="primary" onClick={handleConfirmClick}>
              Confirm
            </Button>
          ) : null}
          {score !== null && (
            <div>
              <strong>Score:</strong> {score}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="danger" onClick={handleDiscardClick}>
              Discard
            </Button>
            <Button onClick={handleNextClick}>Save</Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleModalCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Discard Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to discard the assessment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleModalConfirm}>
            Discard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostResults;
