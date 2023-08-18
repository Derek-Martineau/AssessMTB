import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

class CallSegments extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedSegment: null,
      redirectToFeat1: false,
      redirectToPreviousPage: false,
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
    const shouldGoBack = window.confirm("Are you sure you want to change the park?");
    if (shouldGoBack) {
      this.setState({ redirectToPreviousPage: true });
    }
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

    const { redirectToFeat1, redirectToPreviousPage } = this.state;

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
                <Button variant="danger" onClick={this.handleBackClick}>Change Park</Button>
                <Button variant="primary" onClick={this.handleNextClick} disabled={!this.state.selectedSegment}>
                  Next
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CallSegments;
