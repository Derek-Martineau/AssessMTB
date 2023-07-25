import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class CallSegments extends Component {
    constructor() {
      super();
      this.state = {
        data: [],
        selectedSegment: null,
      };
    }
  
    async componentDidMount() {
      const response = await fetch(`http://localhost:8081/api/segments`);
      const json = await response.json();
      this.setState({ data: json });
    }
  
    handleParkSelection = (segment) => {
      this.setState({ selectedSegment: segment });
    };
  
    handleNextClick = () => {
      const { selectedSegment } = this.state;
      if (selectedSegment) {
        // Do something with the selected Segment, e.g., store it in the state or pass it to a parent component.
        console.log("Selected Segment:", selectedSegment);
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
  
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Which Segment Did You Ride?</Card.Title>
              <div>
                <ul>
                  {this.state.data.map(el => (
                    <li key={el.id}>
                      <Button
                        variant={this.state.selectedSegment === el ? "success" : "primary"}
                        style={buttonStyle}
                        onClick={() => this.handleSegmentSelection(el)}
                      >
                        {el.SegmentName}
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
  