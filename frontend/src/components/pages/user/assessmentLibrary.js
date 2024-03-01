import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ViewLibrary = () => {
  const [assessments, setAssessments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/user/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(async (data) => {
        const updatedAssessments = [];

        for (const assessment of data) {
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
      fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/${assessmentToDelete}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
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
    const newPublicStatus = !currentPublicStatus;
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/${assessmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ PublicStatus: newPublicStatus }),
    })
      .then((response) => {
        if (response.ok) {
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

  const mapNumberToLetter = (number) => {
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
    <div style={{ minHeight: '100vh', overflowX: 'hidden', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontSize: '3rem', margin: '20px 0', textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>Assessment Library</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {assessments.length > 0 ? (
          assessments.reverse().map((assessment) => (
            <div key={assessment._id} style={assessmentCardStyle}>
  <div style={sideBySideContainer}>
    <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0', color: '#222' }}>User: {username}</p>
    <p style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0', color: '#222' }}>Score: {assessment.Score}</p>
  </div>
    <p style={{ fontSize: '1.2rem', color: '#555', borderBottom: '1px solid #000000', width: '100%' }}>Created: {new Date(assessment.Date).toDateString()}</p>
  <p style={{ fontSize: '1.2rem',  color: '#000000' }}>Line Choices: {assessment.featureLines.map((line, index) => mapNumberToLetter(line.lineChoice)).join(', ')}</p>
  <p style={{ fontSize: '1.2rem',  color: '#000000' }}>Segment: {assessment.segmentName}</p>
  <p style={{ fontSize: '1.2rem',  color: '#000000' }}>Difficulty: {assessment.difficulty}</p>
  <p style={{ fontSize: '1.2rem', margin: '0px 0', color: '#000000', borderTop: '1px solid #000000', width: '100%' }}>Public Status: {assessment.PublicStatus ? 'Public' : 'Private'}</p>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
    <Button variant="danger" style={{ fontSize: '1.2rem' }} onClick={() => handleDeleteAssessment(assessment._id)}>Delete</Button>
    <div style={{ marginLeft: '10px' }}>
      <Button
        variant={assessment.PublicStatus ? 'warning' : 'success'}
        style={{ fontSize: '1.2rem' }}
        onClick={() => handleSetPublic(assessment._id, assessment.PublicStatus)}
      >
        {assessment.PublicStatus ? "Set Private" : "Set Public"}
      </Button>
    </div>
  </div>
</div>
          ))
        ) : (
          <p style={{ fontSize: '1.6rem', textAlign: 'center', color: '#555' }}>No assessments found for the specified user.</p>
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
  width: '100%',
  maxWidth: '450px',
  padding: '20px',
  margin: '20px',
  background: '#f7f7f7',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  textAlign: 'left',
};

const sideBySideContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
};

export default ViewLibrary;
