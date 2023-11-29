import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CallParks = () => {
  const [data, setData] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedParkSegments, setSelectedParkSegments] = useState([]);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [loadingBarFillWidth, setLoadingBarFillWidth] = useState("100%");
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showSegmentDropdown, setShowSegmentDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/parks/trailparks`);
        const json = await response.json();
        setData(json);

        // Simulate loading progress
        let loadingProgress = 100;
        const interval = setInterval(() => {
          loadingProgress -= 1;
          const fillWidth = `${loadingProgress}%`;
          setLoadingBarFillWidth(fillWidth);

          if (loadingProgress <= 0) {
            clearInterval(interval);
          }
        }, 100);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleParkSelection = (park) => {
    setSelectedPark(park);
    setSelectedParkSegments([]);
    setShowSegmentDropdown(false);
  };

  const handleNextClick = async () => {
    if (selectedPark) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/parks/trailparks/getsegments/${selectedPark._id}`
        );
        const json = await response.json();
        const sortedSegments = json.sort((a, b) =>
          a.segmentName.localeCompare(b.segmentName)
        );
        setSelectedParkSegments(sortedSegments);
        setShowSegmentDropdown(true);

        // Navigate to CallSegments with the selected trailparkId as a URL parameter
        navigate(`/selectSegment/${selectedPark._id}`);
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    } else {
      alert("Please select a park first.");
    }
  };

  const handleHelpYesClick = () => {
    setShowInstructionsModal(true);
    setShowHelpModal(false);
  };

  const handleInstructionsShow = () => {
    setShowInstructionsModal(true);
  };

  const handleInstructionsClose = () => {
    setShowInstructionsModal(false);
  };

  const buttonStyle = {
    margin: "5px 0",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const buttonWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  };

  const cardStyle = {
    width: "30rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    background: "#f4f4f4",
  };

  const notificationStyle = {
    position: "fixed",
    top: "12.2%",
    right: 0,
    transform: "translateY(-50%)",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const loadingBarStyle = {
    width: "100%",
    height: "10px",
    backgroundColor: "#ccc",
    position: "relative",
    marginTop: "5px",
  };

  const loadingBarFillStyle = {
    width: loadingBarFillWidth,
    height: "100%",
    backgroundColor: "#007bff",
    position: "absolute",
  };

  return (
    <div style={{ background: "#5A5A5A", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title style={{ fontSize: "1.5rem", marginBottom: "15px", textAlign: "center", color: "#333" }}>Which Park Did You Ride?</Card.Title>
          <Card.Subtitle style={{ marginBottom: "15px", textAlign: "center", color: "#555" }}>Please select the park you would like to assess a segment on.</Card.Subtitle>
          <div style={{ listStyleType: 'none', padding: 0 }}>
            {data.map((el) => (
              <li key={el._id}>
                <Button
                  variant={selectedPark === el ? "success" : "primary"}
                  style={buttonStyle}
                  onClick={() => handleParkSelection(el)}
                >
                  {el.parkName}
                </Button>
              </li>
            ))}
          </div>
          {/* Show dropdown menu for selected park's segments */}
          {showSegmentDropdown && (
            <Dropdown style={{ marginTop: "10px" }}>
              <Dropdown.Toggle variant="success" id="segment-dropdown">
                Select a Segment
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "scroll" }}>
                {selectedParkSegments.map((segment) => (
                  <Dropdown.Item key={segment._id}>{segment.segmentName}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
          <div style={buttonWrapperStyle}>
            <Button variant="info" onClick={handleInstructionsShow}>
              Help
            </Button>
            <Button
              variant="primary"
              onClick={handleNextClick}
              disabled={!selectedPark}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
      {/* Help notification */}
      {showHelpModal && (
        <div style={notificationStyle}>
          <p>Would you like assistance on how to take the assessment?</p>
          <Button variant="primary" onClick={handleHelpYesClick}>
            Yes
          </Button>
          <div style={loadingBarStyle}>
            <div style={loadingBarFillStyle}></div>
          </div>
        </div>
      )}
      {/* Instructions Modal */}
      <Modal show={showInstructionsModal} onHide={handleInstructionsClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#333" }}>Assessment Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#555" }}>
          <p>
            <strong>Step 1:</strong> Select the park you would like to assess a segment in. Press the "Next" button to confirm and continue.
          </p>
          <p>
            <strong>Step 2:</strong> Select the segment you would like to assess your technical ability on.
          </p>
          <p>
            <strong>Step 3:</strong> Follow through the features displayed. Select the line that you traveled over. Lines are ranked in alphabetical order descending. This means that the A line is the hardest line to complete and results in the most points possible per feature. You can also select "walked" if you had failed/missed the feature.
          </p>
          <p>
            <strong>Step 4:</strong> View your assessment score and decide to delete or share the assessment results. The assessment score can also be saved to only your personal records if you wish not to share the results.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInstructionsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CallParks;