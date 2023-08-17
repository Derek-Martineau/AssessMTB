import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
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
    this.setState({ redirectToWillowdale: true });
  };

  render() {
    const { redirectToFeat2, redirectToWillowdale } = this.state;

    if (redirectToFeat2) {
      return <Navigate to="/feat2" />;
    }

    if (redirectToWillowdale) {
      return <Navigate to="/willowdale" />;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
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
      </div>
    );
  }
}

export default PostResults;
