import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom"; 

class CallSegments extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedSegment: null,
      redirectToFeat1: false
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:8081/api/segments');
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.error("Error fetching segments:", error);
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

  render() {
    const buttonStyle = {
      margin: "3px 0", // vertical padding
    };

    const buttonWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    };

    const { redirectToFeat1 } = this.state;

    if (redirectToFeat1) {
      // Update Redirect to feat1
      return <Navigate to="http://localhost:8096/newAssessment/selectSegment" />;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Which Segment Did You Ride?</Card.Title>
            <div>
              <ul>
                {this.state.data.map(segment => (
                  <li key={segment.id}>
                    <Button
                      variant={this.state.selectedSegment === segment ? "success" : "primary"}
                      style={buttonStyle}
                      onClick={() => this.handleSegmentSelection(segment)}
                    >
                      {segment.SegmentName} {/* Check the property name */}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div style={buttonWrapperStyle}>
              <Button variant="primary" onClick={this.handleNextClick} disabled={!this.state.selectedSegment}>
                Next
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CallSegments;
