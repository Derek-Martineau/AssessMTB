import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";

class CallFeature extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedLines: Array(6).fill(null), // Store selected lines for each photo
      redirectToFeat2: false,
      redirectToNewAssessment: false,
      showModal: false,
      photos: [],
      photoFilePaths: [
        "/images/Gordon_Walls_F1.JPG",
        "/images/Gordon_Walls_F2.JPG",
        "/images/Gordon_Walls_F3.JPG",
        "/images/Gordon_Walls_F4.JPG",
        "/images/Gordon_Walls_F5.JPG",
        "/images/Gordon_Walls_F6.JPG",
      ],
      currentPhotoIndex: 0,
    };
  }

  componentDidMount() {
    this.fetchPhotosForSegment();
  }

  fetchPhotosForSegment = async () => {
    const { segmentId } = this.props.match.params;

    try {
      const response = await fetch(`http://localhost:8081/api/segments/getphotos/${segmentId}`);
      const photos = await response.json();
      this.setState({ photos });
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }

  // Create a mapping object for line values
  lineValues = {
    "A": 8,
    "B": 6,
    "C": 4,
    "Walked": 1,
  };

  handleLineSelection = (line, index) => {
    const { selectedLines, currentPhotoIndex } = this.state;

    // Use lineValues to get the value for the selected line
    const lineValue = this.lineValues[line];

    // Update the selectedLines array for the current photo with the line value
    selectedLines[currentPhotoIndex] = lineValue;

    this.setState({ selectedLines }, () => {
      console.log("Selected Lines:", this.state.selectedLines);
    });
  };

  handleNextClick = () => {
    const { selectedLines, currentPhotoIndex, photoFilePaths } = this.state;

    // Use lineValues to get the value for the selected line
    const lineValue = selectedLines[currentPhotoIndex];

    if (lineValue !== null) {
      this.storeSelectedLine(lineValue);

      if (currentPhotoIndex < photoFilePaths.length - 1) {
        this.setState((prevState) => ({
          currentPhotoIndex: prevState.currentPhotoIndex + 1,
        }));
      } else {
        this.saveResultToMongoDB().then(() => {
          this.setState({ redirectToFeat2: true });
        });
      }
    } else {
      alert("Please select a line first.");
    }
  };

  saveResultToMongoDB = async () => {
    console.log("Simulating saving result to MongoDB...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  storeSelectedLine = (selectedLine) => {
    console.log(`Storing selected line in the database: ${selectedLine}`);
  };

  handleDiscardClick = () => {
    this.setState({ showModal: true });
  };

  handleModalConfirm = () => {
    this.setState({ redirectToNewAssessment: true, showModal: false });
  };

  handleModalCancel = () => {
    this.setState({ showModal: false });
  };

  handleInstructionsShow = () => {
    this.setState({ showInstructionsModal: true });
  };

  handleInstructionsClose = () => {
    this.setState({ showInstructionsModal: false });
  };

  handleNextPhoto = () => {
    this.setState((prevState) => ({
      currentPhotoIndex: (prevState.currentPhotoIndex + 1) % this.state.photoFilePaths.length,
    }));
  };

  handlePreviousPhoto = () => {
    this.setState((prevState) => ({
      currentPhotoIndex: (prevState.currentPhotoIndex - 1 + this.state.photoFilePaths.length) %
        this.state.photoFilePaths.length,
    }));
  };

  render() {
    const buttonWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    };

    const { redirectToFeat2, selectedLines, currentPhotoIndex, redirectToNewAssessment, showModal, showInstructionsModal } = this.state;

    if (redirectToFeat2) {
      return <Navigate to="/results" />;
    }

    if (redirectToNewAssessment) {
      return <Navigate to="/newAssessment/selectSegment" />;
    }

    return (
      <div style={{ background: '#5A5A5A', minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ width: "45rem" }}>
          <Card.Body>
            <div>
              <h3>Photo for Segment</h3>
              <div>
                <img
                  key={currentPhotoIndex}
                  src={this.state.photoFilePaths[currentPhotoIndex]}
                  alt={`Photo ${currentPhotoIndex + 1}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card.Title>Which line did you choose?</Card.Title>
            </div>
            <br />
            <div style={buttonWrapperStyle}>
              <Button
                variant={selectedLines[currentPhotoIndex] === 1 ? "success" : "primary"}
                onClick={() => this.handleLineSelection("Walked", currentPhotoIndex)}
              >
                Walked
              </Button>
              <Button
                variant={selectedLines[currentPhotoIndex] === 4 ? "success" : "primary"}
                onClick={() => this.handleLineSelection("C", currentPhotoIndex)}
              >
                C
              </Button>
              <Button
                variant={selectedLines[currentPhotoIndex] === 6 ? "success" : "primary"}
                onClick={() => this.handleLineSelection("B", currentPhotoIndex)}
              >
                B
              </Button>
              <Button
                variant={selectedLines[currentPhotoIndex] === 8 ? "success" : "primary"}
                onClick={() => this.handleLineSelection("A", currentPhotoIndex)}
              >
                A
              </Button>
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "flex-end", padding: '5px' }}>
              <Button variant="info" onClick={this.handleInstructionsShow}>Help</Button>
              <Button variant="danger" onClick={this.handleDiscardClick}>Change Segment</Button>
              <Button
                variant="primary"
                onClick={this.handleNextClick}
                disabled={selectedLines[currentPhotoIndex] === null}
              >
                Next
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Modal show={showModal} onHide={this.handleModalCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Change Segment Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to change the segment?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleModalCancel}>Cancel</Button>
            <Button variant="danger" onClick={this.handleModalConfirm}>Confirm</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showInstructionsModal} onHide={this.handleInstructionsClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assessment Instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Step 1:</strong> Select the park you would like to assess a segment in. Press the "Next" button to confirm and continue.</p>
            <p><strong>Step 2:</strong> Select the segment you would like to assess your technical ability on.</p>
            <p><strong>Step 3:</strong> Follow through the features displayed. Select the line that you traveled over. Lines are ranked in alphapbetical order descending. This means that the A line is the hardest line to complete and results in the most points possible per feature. You can also select "Walked" if you had failed/missed the feature.</p>
            <p><strong>Step 4:</strong> View your assessment score and decide to delete or share the segment. The assessment score can also be saved to only your personal records if you wish not to share the results.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleInstructionsClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CallFeature;
