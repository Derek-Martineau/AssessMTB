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

  render() {
    const buttonWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    };

    const { redirectToFeat2, activeButtonIndex } = this.state;

    if (redirectToFeat2) {
      return <Navigate to="/newAssessment/selectSegment" />;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "150vh" }}>
        <Card style={{ width: "45rem" }}>
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card.Title>Which line did you choose?</Card.Title>
            </div>
            <div style={buttonWrapperStyle}>
              <Button
                variant="primary"
                onClick={this.handleNextClick}
                disabled={activeButtonIndex === -1}
              >
                Next
              </Button>
              <Button
                variant={activeButtonIndex === 0 ? "success" : "primary"} // Apply "success" variant for the selected button
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
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CallFeature;
