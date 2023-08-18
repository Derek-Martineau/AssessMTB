import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

class CallFeature extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedLine: null,
      activeButtonIndex: -1,
      redirectToFeat2: false,
      redirectToNewAssessment: false,
    };
  }

  handleLineSelection = (line, index) => {
    this.setState({ selectedLine: line, activeButtonIndex: index });
  };

  handleNextClick = () => {
    const { selectedLine } = this.state;
    if (selectedLine) {
      console.log("Selected Line:", selectedLine);
      this.setState({ redirectToFeat2: true });
    } else {
      alert("Please select a line first.");
    }
  };

  handleDiscardClick = () => {
    const shouldDiscard = window.confirm("Are you sure you want to change the segment?");
    if (shouldDiscard) {
      this.setState({ redirectToNewAssessment: true });
    }
  };

  render() {
    const buttonWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    };

    const { redirectToFeat2, activeButtonIndex, redirectToNewAssessment } = this.state;

    if (redirectToFeat2) {
      return <Navigate to="/results" />;
    }

    if(redirectToNewAssessment) {
      return <Navigate to="/newAssessment/selectSegment" />;
    }

    return (
      <div style={{ background: '#5A5A5A', minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: "45rem" }}>
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card.Title>Which line did you choose?</Card.Title>
            </div>
            <br></br>
            <div style={buttonWrapperStyle}>
              <Button
                variant={activeButtonIndex === 0 ? "success" : "primary"}
                onClick={() => this.handleLineSelection("Walked", 0)}
              >
                Walked
              </Button>
              <Button
                variant={activeButtonIndex === 1 ? "success" : "primary"}
                onClick={() => this.handleLineSelection("C", 1)}
              >
                C
              </Button>
              <Button
                variant={activeButtonIndex === 2 ? "success" : "primary"}
                onClick={() => this.handleLineSelection("B", 2)}
              >
                B
              </Button>
              <Button
                variant={activeButtonIndex === 3 ? "success" : "primary"}
                onClick={() => this.handleLineSelection("A", 3)}
              >
                A
              </Button>
            </div>
            <br></br>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: '5px' }}>
              <Button variant="danger" onClick={this.handleDiscardClick}>Change Segment</Button>
              <Button
                variant="primary"
                onClick={this.handleNextClick}
                disabled={activeButtonIndex === -1}
              >
                Next
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CallFeature;
