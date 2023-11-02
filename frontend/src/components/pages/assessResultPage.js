import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";

function PostResults() {
  const [data] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [movingTime, setMovingTime] = useState("");
  const [confirmedMovingTime, setConfirmedMovingTime] = useState("");
  const [score, setScore] = useState(null);
  const [activeButtonIndex] = useState(-1);
  const [redirectToFeat2, setRedirectToFeat2] = useState(false);
  const [redirectToWillowdale, setRedirectToWillowdale] = useState(false);
  const [showModal, setShowModal] = useState(false);

const { assessmentId } = useParams();
const [assessment, setAssessmentId] = useState(assessmentId);
  
const handleMovingTimeChange = (e) => {
    setMovingTime(e.target.value);
  };

  const handleConfirmClick = () => {
    setConfirmedMovingTime(movingTime);
    console.log("Confirmed Moving Time:", movingTime);
    calculateScore();
  };

  const calculateScore = () => {
    if (confirmedMovingTime && selectedLine) {
      // Perform score calculation based on your criteria
      const movingTimeInSeconds = convertMovingTimeToSeconds(confirmedMovingTime);
      let selectedLineScore = selectedLine.reduce((acc, val) => acc + val, 0);
      const maxMovingTime = 300; // You can adjust this value
      const maxSelectedLineScore = 30; // You can adjust this value
  
      // Calculate scores based on your criteria
      const movingTimeScore = (1 - movingTimeInSeconds / maxMovingTime) * 50;
      selectedLineScore = (selectedLineScore / maxSelectedLineScore) * 50;
  
      // Calculate the final score and update the state
      const finalScore = movingTimeScore + selectedLineScore;
      setScore(finalScore.toFixed(2)); // Convert to a string with 2 decimal places
    }
  };
  
    const convertMovingTimeToSeconds = (time) => {
      const [minutes, seconds] = time.split(":");
      return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    };
    
  const handleNextClick = async () => {
    if (selectedLine) {
      if (confirmedMovingTime) {
        try {
          const response = await fetch("http://localhost:8081/results", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ result: selectedLine, movingTime: confirmedMovingTime }),
          });

          if (response.ok) {
            console.log("Results posted successfully!");
            setRedirectToFeat2(true);
          } else {
            console.error("Error posting results:", response.status);
          }
        } catch (error) {
          console.error("Error posting results:", error);
        }
      } else {
        alert("Please enter and confirm the average moving time.");
      }
    } else {
      alert("Please select a line first.");
    }
  };

  const handleDiscardClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setRedirectToWillowdale(true);
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  if (redirectToFeat2) {
    return <Navigate to="/feat2" />;
  }

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
          {!confirmedMovingTime && (
            <Button variant="primary" onClick={handleConfirmClick}>
              Confirm
            </Button>
          )}
          {confirmedMovingTime ? null : (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="danger" onClick={handleDiscardClick}>
                Discard
              </Button>
              <Button onClick={handleNextClick}>Save</Button>
            </div>
          )}
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
