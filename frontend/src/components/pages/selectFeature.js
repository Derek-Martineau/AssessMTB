import React, { Component } from "react";
import { Card, Button, Modal } from "react-bootstrap";
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
      showModal: false,
      photos: [], // Array to store photos associated with the segment
      photoFilePaths: [
        "/images/Gordon_Walls_F1.JPG",
        "/images/Gordon_Walls_F2.JPG",
        "/images/Gordon_Walls_F3.JPG",
        "/images/Gordon_Walls_F4.JPG",
        "/images/Gordon_Walls_F5.JPG",
        "/images/Gordon_Walls_F6.JPG",
      ],      
      currentPhotoIndex: 0, // Added property to keep track of the currently displayed photo
    };
  }

  componentDidMount() {
    // Fetch photos associated with the segment here
    this.fetchPhotosForSegment();
  }

  fetchPhotosForSegment = async () => {
    const { segmentId } = this.props.match.params; // Assuming you receive segmentId via route params

    try {
      const response = await fetch(`http://localhost:8081/api/segments/getphotos/${segmentId}`);
      const photos = await response.json();
      this.setState({ photos });
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

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
    // Increment the currentPhotoIndex, and loop back to the first photo if at the end
    this.setState((prevState) => ({
      currentPhotoIndex:
        (prevState.currentPhotoIndex + 1) % this.state.photoFilePaths.length,
    }));
  };

  handlePreviousPhoto = () => {
    // Decrement the currentPhotoIndex, and loop to the last photo if at the beginning
    this.setState((prevState) => ({
      currentPhotoIndex:
        (prevState.currentPhotoIndex - 1 + this.state.photoFilePaths.length) %
        this.state.photoFilePaths.length,
    }));
  };

  render() {
    const buttonWrapperStyle = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row-reverse",
    };

    const { redirectToFeat2, activeButtonIndex, redirectToNewAssessment, showModal, showInstructionsModal } = this.state;

    if (redirectToFeat2) {
      return <Navigate to="/results" />;
    }

    if (redirectToNewAssessment) {
      return <Navigate to="/newAssessment/selectSegment" />;
    }

    return (
      <div style={{ background: '#5A5A5A', minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center",}}>
        <Card style={{ width: "45rem" }}>
          <Card.Body>
            {/* Display the currently selected photo */}
            <div>
              <h3>Photo for Segment</h3>
              <div>
              <img
                key={this.state.currentPhotoIndex}
                src={this.state.photoFilePaths[this.state.currentPhotoIndex]}
                alt={`Photo ${this.state.currentPhotoIndex + 1}`}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />

              </div>
            </div>
            
            {/* Add Next and Previous buttons for photo navigation */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="secondary" onClick={this.handlePreviousPhoto}>
                Previous
              </Button>
              <Button variant="secondary" onClick={this.handleNextPhoto}>
                Next
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card.Title>Which line did you choose?</Card.Title>
            </div>
            <br />
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
            <br />
            <div style={{ display: "flex", justifyContent: "flex-end", padding: '5px' }}>
              <Button variant="info" onClick={this.handleInstructionsShow}>Help</Button>
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
        {/* Alert Modal  */}
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
        {/*Instruction Modal*/}
        <Modal show={showInstructionsModal} onHide={this.handleInstructionsClose}>
          <Modal.Header closeButton>
            <Modal.Title>Assessment Instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Step 1:</strong> Select the park you would like to assess a segment in. Press the "Next" button to confirm and continue.</p>
            <p><strong>Step 2:</strong> Select the segment you would like to assess your technical ability on.</p>
            <p><strong>Step 3:</strong> Follow through the features displayed. Select the line that you traveled over. Lines are ranked in alphapbetical order descending. This means that the A line is the hardest line to complete and results in the most points possible per feature. You can also select walked if you had failed/missed the feature.</p>
            <p><strong>Step 4:</strong> View your assessment score and decide to delete or share the segment. The Assessment score can also be saved to only your personal records if you wish not to share the results.</p>
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
