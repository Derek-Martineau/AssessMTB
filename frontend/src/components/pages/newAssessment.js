import React, { Component, Redirect } from "react";
import { Card, Button } from "react-bootstrap";

class CallParks extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedPark: null,
      redirectToSegment: false,
    };
  }

  async componentDidMount() {
    const response = await fetch(`http://localhost:8081/parks/trailparks`);
    const json = await response.json();
    this.setState({ data: json });
  }

  handleParkSelection = (park) => {
    this.setState({ selectedPark: park });
  };

  handleNextClick = () => {
    const { selectedPark } = this.state;
    if (selectedPark) {
      // Do something with the selected park, e.g., store it in the state or pass it to a parent component.
      console.log("Selected Park:", selectedPark);
      this.setState({ redirectToSegment: true });
    } else {
      alert("Please select a park first.");
    }
  };

  render() {
    const buttonStyle = {
      margin: "3px 0", // Adjust the vertical padding
    };

    const buttonWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    };

    const { redirectToSegment } = this.state;

    if (redirectToSegment) {
      return <Redirect to="http://localhost:8096/newAssessment/selectSegment" />;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Card style={{ width: "20rem"}}>
          <Card.Body>
            <Card.Title>Which Park Did You Ride?</Card.Title>
            <div>
              <ul>
                {this.state.data.map(el => (
                  <li key={el.id}>
                    <Button
                      variant={this.state.selectedPark === el ? "success" : "primary"}
                      style={buttonStyle}
                      onClick={() => this.handleParkSelection(el)}
                    >
                      {el.parkName}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div style={buttonWrapperStyle}>
              <Button variant="primary" onClick={this.handleNextClick} disabled={!this.state.selectedPark}>
                Next
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CallParks;
