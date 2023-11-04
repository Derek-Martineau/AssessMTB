import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewLibrary = () => {
  const [assessments, setAssessments] = useState([]);
  const { username } = useParams(); // Get the username from the URL

  useEffect(() => {
    // Use the 'username' variable to customize the API route
    fetch(`http://localhost:8081/api/results/user/${username}`)
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
          const segmentResponse = await fetch(`http://localhost:8081/api/segments/${assessment.Segment}`);
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

  return (
    <div style={{ background: '#5A5A5A', minHeight: '100vh', overflowX: 'hidden' }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Assessment Library</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {assessments.length > 0 ? (
          assessments.map((assessment) => (
            <div key={assessment._id} style={assessmentCardStyle}>
              <h2>Assessment Date: {new Date(assessment.Date).toDateString()}</h2>
              <p>User: {username}</p>
              <p>Segment: {assessment.segmentName}</p>
              <p>Difficulty: {assessment.difficulty}</p>
              <p>Line Choices: {assessment.featureLines.map((line) => line.lineChoice).join(', ')}</p>
              <p>Score: {assessment.Score}</p>
            </div>
          ))
        ) : (
          <p>No assessments found for the specified user.</p>
        )}
      </div>
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
