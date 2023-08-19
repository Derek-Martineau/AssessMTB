import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";

class PostResults extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedLine: null,
      activeButtonIndex: -1,
      redirectToFeat2: false,
      redirectToWillowdale: false,
      showModal: false,
    };
  }

  handleLineSelection = (line, index) => {
    this.setState({ selectedLine: line, activeButtonIndex: index });
  };

  handleNextClick = async () => {
    const { selectedLine } = this.state;
    if (selectedLine) {
      try {
        // Post the results to the server
        const response = await fetch("http://localhost:8081/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ result: selectedLine }),
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
    const { redirectToFeat2, redirectToWillowdale, showModal } = this.state;

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
            {/* Render results here */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="danger" onClick={this.handleDiscardClick}>Discard</Button>
              <Button onClick={this.handleNextClick}>Save</Button>
            </div>
          </Card.Body>
        </Card>
        {/* Alert styling */}
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
