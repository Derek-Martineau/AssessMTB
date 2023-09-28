import React, { Component } from "react";
import { Card, Button, Modal, Dropdown } from "react-bootstrap";
import { Navigate } from "react-router-dom"; // Import Navigate for navigation

class CallParks extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedPark: null,
      selectedParkSegments: [],
      showHelpModal: false,
      loadingBarFillWidth: "100%",
      showInstructionsModal: false,
      showSegmentDropdown: false, // state for dropdown visibility
      redirectToSelectSegments: false, // state for redirection
    };
  }

  async componentDidMount() {
    const response = await fetch(`http://localhost:8081/parks/trailparks`);
    const json = await response.json();
    this.setState({ data: json });

    // Show the help notification after 10 seconds
    setTimeout(() => {
      this.setState({ showHelpModal: true });
      // Automatically close the notification after 10 seconds
      setTimeout(() => {
        this.setState({ showHelpModal: false });
      }, 10000);

      // Update the loading bar fill width over 10 seconds
      let loadingProgress = 100;
      const interval = setInterval(() => {
        loadingProgress -= 1;
        const fillWidth = `${loadingProgress}%`;
        this.setState({ loadingBarFillWidth: fillWidth });

        if (loadingProgress <= 0) {
          clearInterval(interval);
        }
      }, 100);
    }, 0);
  }

  handleParkSelection = (park) => {
    this.setState({ selectedPark: park, selectedParkSegments: [], showSegmentDropdown: false });
  };

  handleNextClick = async () => {
    const { selectedPark } = this.state;
    if (selectedPark) {
      try {
        const response = await fetch(
          `http://localhost:8081/parks/trailparks/getsegments/${selectedPark._id}`
        );
        const json = await response.json();
        const sortedSegments = json.sort((a, b) =>
          a.segmentName.localeCompare(b.segmentName)
        );
        this.setState({ selectedParkSegments: sortedSegments, showSegmentDropdown: true });
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    } else {
      alert("Please select a park first.");
    }
  };

  handleHelpYesClick = () => {
    this.setState({ showInstructionsModal: true, showHelpModal: false });
  };

  handleInstructionsShow = () => {
    this.setState({ showInstructionsModal: true });
  };

  handleInstructionsClose = () => {
    this.setState({ showInstructionsModal: false });
  };

  handleNavigateToSelectSegment = () => {
    this.setState({ redirectToSelectSegments: true });
  };

  render() {
    const buttonStyle = {
      margin: "3px 0",
    };

    const buttonWrapperStyle = {
      display: "flex",
      justifyContent: "center",
    };

    const cardStyle = {
      width: "25rem",
      padding: "20px",
    };

    const notificationStyle = {
      position: "fixed",
      top: "12.2%",
      right: 0,
      transform: "translateY(-50%)",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };

    const loadingBarStyle = {
      width: "100%",
      height: "10px",
      backgroundColor: "#ccc",
      position: "relative",
      marginTop: "5px",
    };

    const loadingBarFillStyle = {
      width: this.state.loadingBarFillWidth,
      height: "100%",
      backgroundColor: "#007bff",
      position: "absolute",
    };

    // Check if redirectToSelectSegments is true, then redirect to /selectSegments
    if (this.state.redirectToSelectSegments) {
      return <Navigate to="/selectSegment" />;
    }

    return (
      <div style={{ background: "#5A5A5A", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={cardStyle}>
          <Card.Body>
            <Card.Title>Which Park Did You Ride?</Card.Title>
            <Card.Subtitle>Please select the park you would like to assess a segment on.</Card.Subtitle>
            <br />
            <div>
              <ul>
                {this.state.data.map((el) => (
                  <li key={el._id}>
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
            {/* Show dropdown menu for selected park's segments */}
            {this.state.showSegmentDropdown && (
              <Dropdown style={{ marginTop: "10px" }}>
                <Dropdown.Toggle variant="success" id="segment-dropdown">
                  Select a Segment
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "scroll" }}>
                  {this.state.selectedParkSegments.map((segment) => (
                    <Dropdown.Item key={segment._id}>{segment.segmentName}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <div style={buttonWrapperStyle}>
              <Button variant="info" onClick={this.handleInstructionsShow}>
                Help
              </Button>
              <Button
                variant="primary"
                onClick={this.handleNextClick}
                disabled={!this.state.selectedPark}
              >
                Next
              </Button>
              {/* Second "Next" button using Navigate */}
              <Button variant="primary" onClick={this.handleNavigateToSelectSegment}>
                Next (to selectSegment)
              </Button>
            </div>
          </Card.Body>
        </Card>
        {/* Help notification */}
        {this.state.showHelpModal && (
          <div style={notificationStyle}>
            <p>Would you like assistance on how to take the assessment?</p>
            <Button variant="primary" onClick={this.handleHelpYesClick}>
              Yes
            </Button>
            <div style={loadingBarStyle}>
              <div style={loadingBarFillStyle}></div>
            </div>
          </div>
        )}
        {/* Instructions Modal */}
        <Modal show={this.state.showInstructionsModal} onHide={this.handleInstructionsClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assessment Instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Step 1:</strong> Select the park you would like to assess a segment in. Press the "Next" button to confirm and continue.
            </p>
            <p>
              <strong>Step 2:</strong> Select the segment you would like to assess your technical ability on.
            </p>
            <p>
              <strong>Step 3:</strong> Follow through the features displayed. Select the line that you traveled over. Lines are ranked in alphabetical order descending. This means that the A line is the hardest line to complete and results in the most points possible per feature. You can also select "walked" if you had failed/missed the feature.
            </p>
            <p>
              <strong>Step 4:</strong> View your assessment score and decide to delete or share the assessment results. The assessment score can also be saved to only your personal records if you wish not to share the results.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleInstructionsClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CallParks;
