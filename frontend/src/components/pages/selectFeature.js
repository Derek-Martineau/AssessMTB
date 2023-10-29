import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";

function CallFeature() {
  const [selectedLines, setSelectedLines] = useState(Array(6).fill(null));
  const [redirectToNewAssessment, setRedirectToNewAssessment] = useState(false);
  const [redirectToResults, setRedirectToResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [photoFilePaths] = useState([
    "/images/Gordon_Walls_F1.JPG",
    "/images/Gordon_Walls_F2.JPG",
    "/images/Gordon_Walls_F3.JPG",
    "/images/Gordon_Walls_F4.JPG",
    "/images/Gordon_Walls_F5.JPG",
    "/images/Gordon_Walls_F6.JPG",
  ]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const { segmentId, userId } = useParams();

  const [user, setUser] = useState(userId);
  const [segment, setSegment] = useState(segmentId);

  useEffect(() => {
    console.log("User:", user);
    console.log("Segment:", segment);
    // You may want to use these values in your fetchPhotosForSegment and saveSelectedLinesToDatabase functions.
  }, [user, segment]);

  const calculateAssessmentScore = (selectedLines) => {
    // Replace this with your actual scoring logic
    return 42; // Placeholder score
  };

  const sendDataToServer = (requestData) => {
    // Make an HTTP POST request to send data to the server
    return fetch("http://localhost:8081/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          // Request was successful
          return response.json();
        } else {
          // Request failed, handle the error
          throw new Error(`Failed to send data to the server. Status: ${response.status}`);
        }
      })
      .then((data) => {
        console.log("Response Data:", data);
        // Handle successful response data here
        // After sending data to the server, navigate to "/results"
        setRedirectToResults(true);
      })
      .catch((error) => {
        console.error("Error while sending data to the server:", error);
      });
  };

  // Create a mapping object for line values
  const lineValues = {
    "A": 8,
    "B": 6,
    "C": 4,
    "Walked": 1,
  };

  const handleLineSelection = (line) => {
    // Update the selectedLines array for the current photo with the line value
    const updatedSelectedLines = [...selectedLines];
    updatedSelectedLines[currentPhotoIndex] = lineValues[line];
    setSelectedLines(updatedSelectedLines);

    // Log the selected line to the console
    console.log("Selected Lines:", updatedSelectedLines);
  };

  const handleNextClick = () => {
    const lineValue = selectedLines[currentPhotoIndex];

    if (lineValue !== null) {
      if (currentPhotoIndex < photoFilePaths.length - 1) {
        setCurrentPhotoIndex(currentPhotoIndex + 1);
      } else {
        // Array is full, perform necessary actions
        const assessmentScore = calculateAssessmentScore(selectedLines);
        const requestData = {
          User: user,
          Segment: segment,
          featureLines: selectedLines.map((line) => ({
            lineChoice: line,
          })),
          score: assessmentScore,
        };

        // Send the data to the server using the sendDataToServer function
        sendDataToServer(requestData);
      }
    } else {
      alert("Please select a line first.");
    }
  };

  const handleDiscardClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setRedirectToNewAssessment(true);
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleInstructionsShow = () => {
    setShowInstructionsModal(true);
  };

  const handleInstructionsClose = () => {
    setShowInstructionsModal(false);
  };

  const buttonWrapperStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };
  
    if (redirectToResults) {
      return <Navigate to="/results" />;
    }

  return (
    <div style={{ background: '#5A5A5A', minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "45rem" }}>
        <Card.Body>
          <div>
            <h3>Photo for Segment</h3>
            <div>
              <img
                key={currentPhotoIndex}
                src={photoFilePaths[currentPhotoIndex]}
                alt={`Photo ${currentPhotoIndex + 1}`}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card.Title>Which line did you choose?</Card.Title>
          </div>
          <br />
          <div style={buttonWrapperStyle}>
  <Button
   style={{ margin: "0 25px" }}
    variant={selectedLines[currentPhotoIndex] === 8 ? "success" : "primary"}
    onClick={() => handleLineSelection("A")}
  >
    A 
  </Button>
  <Button
     style={{ margin: "0 25px" }}
    variant={selectedLines[currentPhotoIndex] === 6 ? "success" : "primary"}
    onClick={() => handleLineSelection("B")}
  >
    B 
  </Button>
  <Button
     style={{ margin: "0 25px" }}
    variant={selectedLines[currentPhotoIndex] === 4 ? "success" : "primary"}
    onClick={() => handleLineSelection("C")}
  >
    C 
  </Button>
  <Button
   style={{ margin: "0 25px" }}
    variant={selectedLines[currentPhotoIndex] === 1 ? "success" : "primary"}
    onClick={() => handleLineSelection("Walked")}
  >
    Walked 
  </Button>
</div>
<br />

          <div style={{ display: "flex", justifyContent: "flex-end", padding: '5px' }}>
            <Button variant="info" onClick={handleInstructionsShow}>Help</Button>
            <Button variant="danger" onClick={handleDiscardClick}>Change Segment</Button>
            <Button
              variant="primary"
              onClick={handleNextClick}
              disabled={selectedLines[currentPhotoIndex] === null}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleModalCancel}>
        {/* Modal content */}
      </Modal>
      <Modal show={showInstructionsModal} onHide={handleInstructionsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assessment Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Step 1:</strong> Select the park you would like to assess a segment in. Press the "Next" button to confirm and continue.</p>
          <p><strong>Step 2:</strong> Select the segment you would like to assess your technical ability on.</p>
          <p><strong>Step 3:</strong> Follow through the features displayed. Select the line that you traveled over. Lines are ranked in alphabetical order descending. This means that the A line is the hardest line to complete and results in the most points possible per feature. You can also select "Walked" if you had failed/missed the feature.</p>
          <p><strong>Step 4:</strong> View your assessment score and decide to delete or share the segment. The assessment score can also be saved to only your personal records if you wish not to share the results.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInstructionsClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CallFeature;
