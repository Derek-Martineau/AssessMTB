import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";

class CallSegments extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedSegment: null,
      redirectToFeat1: false,
      redirectToPreviousPage: false,
      showModal: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:8081/api/segments");
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  handleSegmentSelection = (segment) => {
    this.setState({ selectedSegment: segment });
  };

  handleNextClick = () => {
    const { selectedSegment } = this.state;
    if (selectedSegment) {
      console.log("Selected Segment:", selectedSegment);
      this.setState({ redirectToFeat1: true });
    } else {
      alert("Please select a Segment first.");
    }
  };

  handleBackClick = () => {
    this.setState({ showModal: true });
  };

  handleModalConfirm = () => {
    this.setState({ redirectToPreviousPage: true, showModal: false });
  };

  handleModalCancel = () => {
    this.setState({ showModal: false });
  };

  handleInstructionsShow = () => {
    this.setState({ showInstructionsModal: true });
  };

  handleInstructionsClose = () => {
    this.setState({ showInstructionsModal: false });
  };

  render() {
    const buttonStyle = {
      margin: "3px 0", // vertical padding
    };

    const buttonWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    };

    const { redirectToFeat1, redirectToPreviousPage, showModal, showInstructionsModal } = this.state;

    if (redirectToFeat1) {
      return <Navigate to="/selectSegment/selectFeature" />;
    }
    if (redirectToPreviousPage) {
      return <Navigate to="/newAssessment" />;
    }

    console.log("Data:", this.state.data);

    return (
      <div style={{ background: '#5A5A5A', minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Which Segment Did You Ride?</Card.Title>
            <div>
              <ul>
                {this.state.data.map(el => {
                  console.log("ID:", el.id); 
                  return (
                    <li key={el.id}>
                      <Button
                        variant={this.state.selectedSegment === el ? "success" : "primary"}
                        style={buttonStyle}
                        onClick={() => this.handleSegmentSelection(el)}
                      >
                        {el.segmentName}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div style={buttonWrapperStyle}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="info" onClick={this.handleInstructionsShow}>Help</Button>
                <Button variant="danger" onClick={this.handleBackClick}>Change Park</Button>
                <Button variant="primary" onClick={this.handleNextClick} disabled={!this.state.selectedSegment}>
                  Next
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        {/* Custom modal */}
        <Modal show={showModal} onHide={this.handleModalCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Change Park Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to change the park?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalCancel}>Cancel</Button>
            <Button variant="danger" onClick={this.handleModalConfirm}>Confirm</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showInstructionsModal} onHide={this.handleInstructionsClose}>
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
            <Button variant="secondary" onClick={this.handleInstructionsClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CallSegments;
