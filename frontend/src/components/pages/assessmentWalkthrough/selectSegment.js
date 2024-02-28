import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../../utilities/decodeJwt";

const CallSegments = () => {
  const { trailparkId } = useParams();
  const [data, setData] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [redirectToFeat1, setRedirectToFeat1] = useState(false);
  const [redirectToPreviousPage, setRedirectToPreviousPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/parks/trailparks/getsegments/${trailparkId}`);
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
      setRedirectToFeat1(true);
    } else {
      alert("Please select a Segment first.");
    }
  };

  useEffect(() => {
    const user = getUserInfo();
    setUser(user);

    if (redirectToFeat1 && user.userId && selectedSegment) {
      navigate(`/selectSegment/${selectedSegment._id}/${user.userId}/selectFeature`);
    }
  }, [redirectToFeat1]);

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
    navigate(`/selectSegment/${selectedSegment._id}/${user.id}/selectFeature`);
    return null;
  }

  if (redirectToPreviousPage) {
    return <Navigate to="/newAssessment" />;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "30rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: '#f4f4f4' }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "1.5rem", marginBottom: "15px", textAlign: "center", color: "#333" }}>Which Segment Did You Ride?</Card.Title>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {data.map(el => (
  <Button
    key={el.segmentId}
    variant={selectedSegment === el ? "success" : "primary"}
    style={{
      margin: "5px 0",
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    onClick={() => handleSegmentSelection(el)}
  >
    {el.segmentName}
  </Button>
))}

          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Button variant="info" onClick={handleInstructionsShow}>Help</Button>
            <Button variant="danger" onClick={handleBackClick}>Change Park</Button>
            <Button variant="primary" onClick={handleNextClick} disabled={!selectedSegment}>
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleModalCancel}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#333" }}>Change Park Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#555" }}>
          Are you sure you want to change the park?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalCancel}>Cancel</Button>
          <Button variant="danger" onClick={handleModalConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showInstructionsModal} onHide={handleInstructionsClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#333" }}>Assessment Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#555" }}>
          <p style={{ marginBottom: "10px" }}><strong>Step 1:</strong> Select the park you would like to assess a segment in. Press the "Next" button to confirm and continue.</p>
          <p style={{ marginBottom: "10px" }}><strong>Step 2:</strong> Select the segment you would like to assess your technical ability on.</p>
          <p style={{ marginBottom: "10px" }}><strong>Step 3:</strong> Follow through the features displayed. Select the line that you traveled over. Lines are ranked in alphabetical order descending. This means that the A line is the hardest line to complete and results in the most points possible per feature. You can also select walked if you had failed/missed the feature.</p>
          <p style={{ marginBottom: "10px" }}><strong>Step 4:</strong> View your assessment score and decide to delete or share the segment. The Assessment score can also be saved to only your personal records if you wish not to share the results.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleInstructionsClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CallSegments;
