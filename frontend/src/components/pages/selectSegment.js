import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";

const CallSegments = () => {
  const { trailparkId } = useParams();
  const [data, setData] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [redirectToFeat1, setRedirectToFeat1] = useState(false);
  const [redirectToPreviousPage, setRedirectToPreviousPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  useEffect(() => {
    // Fetch data specific to the park using trailparkId
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/parks/trailparks/getsegments/${trailparkId}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [trailparkId]);

  const handleSegmentSelection = (segment) => {
    setSelectedSegment(segment);
  };

  const handleNextClick = () => {
    if (selectedSegment) {
      console.log("Selected Segment:", selectedSegment);
      setRedirectToFeat1(true);
    } else {
      alert("Please select a Segment first.");
    }
  };

  const handleBackClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setRedirectToPreviousPage(true);
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

  if (redirectToFeat1) {
    return <Navigate to="/selectSegment/selectFeature" />;
  }
  if (redirectToPreviousPage) {
    return <Navigate to="/newAssessment" />;
  }

  return (
    <div style={{ background: '#5A5A5A', minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Which Segment Did You Ride?</Card.Title>
          <div>
            <ul>
              {data.map(el => (
                <li key={el.id}>
                  <Button
                    variant={selectedSegment === el ? "success" : "primary"}
                    style={{ margin: "3px 0" }}
                    onClick={() => handleSegmentSelection(el)}
                  >
                    {el.segmentName}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="info" onClick={handleInstructionsShow}>Help</Button>
              <Button variant="danger" onClick={handleBackClick}>Change Park</Button>
              <Button variant="primary" onClick={handleNextClick} disabled={!selectedSegment}>
                Next
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleModalCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Change Park Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the park?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalCancel}>Cancel</Button>
          <Button variant="danger" onClick={handleModalConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showInstructionsModal} onHide={handleInstructionsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assessment Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Step 1:</strong> Select the park you would like to assess a segment in. Press the "Next" button to confirm and continue.</p>
          <p><strong>Step 2:</strong> Select the segment you would like to assess your technical ability on.</p>
          <p><strong>Step 3:</strong> Follow through the features displayed. Select the line that you traveled over. Lines are ranked in alphapbetical order descending. This means that the A line is the hardest line to complete and results in the most points possible per feature. You can also select walked if you had failed/missed the feature.</p>
          <p><strong>Step 4:</strong> View your assessment score and decide to delete or share the segment. The Assessment score can also be saved to only your personal records if you wish not to share the results.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInstructionsClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CallSegments;
