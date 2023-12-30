import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ViewLibrary = () => {
  const [assessments, setAssessments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the modal
  const [assessmentToDelete, setAssessmentToDelete] = useState(null); // State to store the assessment to delete
  const { username } = useParams(); // Get the username from the URL

  useEffect(() => {
    // Use the 'username' variable to customize the API route
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/user/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(async (data) => {
        // Create an array to store the updated assessments
        const updatedAssessments = [];

        for (const assessment of data) {
          // Fetch the Segment data for each assessment
          const segmentResponse = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/segments/${assessment.Segment}`);
          if (segmentResponse.ok) {
            const segmentData = await segmentResponse.json();
            assessment.segmentName = segmentData.segmentName;
            assessment.difficulty = segmentData.difficulty;
          }

          updatedAssessments.push(assessment);
        }

        setAssessments(updatedAssessments);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setAssessments([]);
      });
  }, [username]);

  const handleDeleteAssessment = (assessmentId) => {
    setAssessmentToDelete(assessmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (assessmentToDelete) {
      // Send a request to your backend API to delete the assessment
      fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/${assessmentToDelete}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // If the delete request is successful, update the UI by filtering out the deleted assessment
            setAssessments((currentAssessments) =>
              currentAssessments.filter((assessment) => assessment._id !== assessmentToDelete)
            );
          } else {
            console.error('Error deleting assessment:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting assessment:', error);
        });
    }
    setShowDeleteModal(false);
  };

  const closeDeleteModal = () => {
    setAssessmentToDelete(null);
    setShowDeleteModal(false);
  };

  const handleSetPublic = (assessmentId, currentPublicStatus) => {
    // Send a request to your backend API to update the PublicStatus
    const newPublicStatus = !currentPublicStatus; // Toggle the PublicStatus
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/${assessmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ PublicStatus: newPublicStatus }),
    })
      .then((response) => {
        if (response.ok) {
          // If the update request is successful, update the UI by setting the PublicStatus
          setAssessments((currentAssessments) =>
            currentAssessments.map((assessment) =>
              assessment._id === assessmentId ? { ...assessment, PublicStatus: newPublicStatus } : assessment
            )
          );
        } else {
          console.error('Error updating PublicStatus:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error updating PublicStatus:', error);
      });
  };

// Function to map numbers to letters
const mapNumberToLetter = (number) => {
  // Parse the number as an integer
  const parsedNumber = parseInt(number, 10);

  switch (parsedNumber) {
    case 8:
      return 'A';
    case 6:
      return 'B';
    case 4:
      return 'C';
    case 1:
      return 'Walked';
    default:
      return '';
  }
};

  return (
    <div style={{ background: '#5A5A5A', minHeight: '100vh', overflowX: 'hidden' }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Assessment Library</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontFamily: "sans-serif", fontSize: "18px" }}>
        {assessments.length > 0 ? (
          assessments.map((assessment) => (
            <div key={assessment._id} style={assessmentCardStyle}>
              <h2>Assessment Date: {new Date(assessment.Date).toDateString()}</h2>
              <p>User: {username}</p>
              <p>Segment: {assessment.segmentName}</p>
              <p>Public Status: {assessment.PublicStatus ? 'Public' : 'Private'}</p>
              <p>Difficulty: {assessment.difficulty}</p>
              <p>
              Line Choices: {assessment.featureLines.map((line) => {
                console.log('line', line); // Add this console log
                const letter = mapNumberToLetter(line.lineChoice);
                console.log('letter', letter); // Add this console log
                return letter;
              }).join(', ')}
            </p>
              <p>Score: {assessment.Score}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px' }}>
                <Button variant="danger" onClick={() => handleDeleteAssessment(assessment._id)}>Delete</Button>
                 <div style={{ marginLeft: '10px' }}>
                 <Button
                    variant={assessment.PublicStatus ? "warning" : "warning"}
                    onClick={() => handleSetPublic(assessment._id, assessment.PublicStatus)}
                    >
                    {assessment.PublicStatus ? "Set Private" : "Set Public"}
                </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No assessments found for the specified user.</p>
        )}
      </div>

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this assessment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const assessmentCardStyle = {
  width: '300px',
  minHeight: '200px',
  padding: '20px',
  margin: '20px',
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center',
};

export default ViewLibrary;