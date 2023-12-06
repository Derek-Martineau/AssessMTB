import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Navigate, useParams, useNavigate } from "react-router-dom";

function CallFeature() {
  const [selectedLines, setSelectedLines] = useState(Array(6).fill(null));
  const [redirectToNewAssessment, setRedirectToNewAssessment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [segmentData, setSegmentData] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  // const [photoFilePaths] = useState([
  //   "/images/Gordon_Walls_F1.JPG",
  //   "/images/Gordon_Walls_F2.JPG",
  //   "/images/Gordon_Walls_F3.JPG",
  //   "/images/Gordon_Walls_F4.JPG",
  //   "/images/Gordon_Walls_F5.JPG",
  //   "/images/Gordon_Walls_F6.JPG",
  // ]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photoFilePaths, setPhotoFilePaths] = useState([]);
  const [photos, setPhotos] = useState([]);
  const { segmentId, userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(userId);
  const [segment, setSegment] = useState(segmentId);
  const [assessmentId, setAssessmentId] = useState(null);
  const [redirectToResults, setRedirectToResults] = useState(false);
// Effect to fetch image data from the server
useEffect(() => {
  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/images/${segmentId}`);
      const data = await response.json();
      setPhotos(data); // Assuming the API returns an array of image data
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  fetchImages();
}, [segmentId]);
  useEffect(() => {
    console.log("User:", user);
    console.log("Segment:", segment);
  
    // Parse the query parameter "assessmentId" from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const assessmentIdParam = urlParams.get("assessmentId");
  
    // Set assessmentId based on the query parameter
    setAssessmentId(assessmentIdParam);
  
    if (segmentId && userId && assessmentIdParam) {
      // Wait for assessmentId to be set, and then navigate to the results page
      setTimeout(() => {
        setRedirectToResults(true);
      }, 0);
    }
  }, [user, segment]);
  
  if (redirectToResults) {
    // Ensure that the newly created assessmentId is in the URL
    if (assessmentId) {
      return <Navigate to={`/results/${assessmentId}`} />;
    }
  }
  

  const calculateAssessmentScore = (selectedLines) => {
    // Replace this with your actual scoring logic
    return 42; // Placeholder score
  };

  const sendDataToServer = (requestData) => {
    // Make an HTTP POST request to send data to the server
    return fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to send data to the server. Status: ${response.status}`);
        }
      })
      .then((data) => {
        console.log("Response Data:", data);
  
        // Set the assessmentId received from the server
        setAssessmentId(data._id);
  
        // After setting the assessmentId, navigate to the next page with assessmentId
        navigate(`/results/${data._id}`);
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
      if (currentPhotoIndex < photoFilePaths.length - 1) { // this could be photoIDs
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
          PublicStatus: false,
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
    return <Navigate to={`/results/${assessmentId}`} />;
    }

    const buttonStyle = (lineValue) => {
      const isSelected = selectedLines[currentPhotoIndex] === lineValue;
      return isSelected
        ? { backgroundColor: "darkgrey", color: "white", boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)" }
        : {};
    };
    
  return (
    <div style={{ background: '#5A5A5A', minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "45rem" }}>
        <Card.Body>
          <div>
            <h3>Photo for Segment</h3>
            <div>
              {photos.length > 0 && photos[currentPhotoIndex] && photos[currentPhotoIndex].base64Data && (
                <img
                  key={currentPhotoIndex}
                  src={`data:image/png;base64,${photos[currentPhotoIndex].base64Data}`}
                  alt={`Photo ${currentPhotoIndex + 1}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card.Title>Which line did you choose?</Card.Title>
          </div>
          <br />
          <div style={buttonWrapperStyle}>
  <Button
    style={buttonStyle(8)}
    variant={selectedLines[currentPhotoIndex] === 8 ? "success" : "danger"}
    onClick={() => handleLineSelection("A")}
  >
    A
  </Button>
  <Button
    style={buttonStyle(6)}
    variant={selectedLines[currentPhotoIndex] === 6 ? "success" : "warning"}
    onClick={() => handleLineSelection("B")}
  >
    B
  </Button>
  <Button
    style={buttonStyle(4)}
    variant={selectedLines[currentPhotoIndex] === 4 ? "success" : "success"}
    onClick={() => handleLineSelection("C")}
  >
    C
  </Button>
  <Button
    style={buttonStyle(1)}
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