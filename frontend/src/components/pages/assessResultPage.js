import React, { Component } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";

class PostResults extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedLine: null,
      movingTime: "", // Add a state for moving time
      confirmedMovingTime: "", // Add a state to store confirmed moving time
      activeButtonIndex: -1,
      redirectToFeat2: false,
      redirectToWillowdale: false,
      showModal: false,
    };
  }

  handleMovingTimeChange = (e) => {
    this.setState({ movingTime: e.target.value });
  };

  handleConfirmClick = () => {
    this.setState({ confirmedMovingTime: this.state.movingTime });
    console.log("Confirmed Moving Time:", this.state.movingTime); // Log confirmed moving time
  };

  handleNextClick = async () => {
    const { selectedLine, confirmedMovingTime } = this.state;
    if (selectedLine) {
      if (confirmedMovingTime) {
        try {
          // Post the results to the server
          const response = await fetch("http://localhost:8081/results", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ result: selectedLine, movingTime: confirmedMovingTime }),
          });

          if (response.ok) {
            console.log("Results posted successfully!");
            this.setState({ redirectToFeat2: true });
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

  handleDiscardClick = () => {
    this.setState({ showModal: true });
  };

  handleModalConfirm = () => {
    this.setState({ redirectToWillowdale: true, showModal: false });
  };

  handleModalCancel = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { redirectToFeat2, redirectToWillowdale, showModal, movingTime, confirmedMovingTime } = this.state;

    if (redirectToFeat2) {
      return <Navigate to="/feat2" />;
    }

    if (redirectToWillowdale) {
      return <Navigate to="/willowdale" />;
    }

    return (
      <div style={{ background: '#5A5A5A', minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: "45rem" }}>
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card.Title>Results</Card.Title>
            </div>
            {confirmedMovingTime ? ( // Conditionally render form or confirmation
              <div>
                <strong>Moving Time:</strong> {confirmedMovingTime}
              </div>
            ) : (
              <Form>
                <Form.Group controlId="movingTime">
                  <Form.Label>Enter The Total Moving Time</Form.Label>
                  <Form.Control
                    type="text"
                    value={movingTime}
                    onChange={this.handleMovingTimeChange}
                  />
                </Form.Group>
              </Form>
            )}
            {!confirmedMovingTime && (
              <Button variant="primary" onClick={this.handleConfirmClick}>
                Confirm
              </Button>
            )}
            {confirmedMovingTime ? null : ( // Hide buttons when confirmed
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="danger" onClick={this.handleDiscardClick}>Discard</Button>
                <Button onClick={this.handleNextClick}>Save</Button>
              </div>
            )}
          </Card.Body>
        </Card>
        {/* Alert Modal */}
        <Modal show={showModal} onHide={this.handleModalCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Discard Assessment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to discard the assessment?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalCancel}>Cancel</Button>
            <Button variant="danger" onClick={this.handleModalConfirm}>Discard</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PostResults;
