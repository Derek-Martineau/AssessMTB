import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewLibrary = () => {
  const [assessments, setAssessments] = useState([]);
  const { username } = useParams(); // Get the username from the URL
  const [segment, setSegment] = useState([]);

  useEffect(() => {
    // Use the 'username' variable to customize the API route
    fetch(`http://localhost:8081/api/results/user/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the data to the console
        setAssessments(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setAssessments([]); // Set assessments to an empty array to handle the error
      });
  }, [username]); // Add 'username' as a dependency to re-fetch data when the username changes

  return (
    <div style={{ background: '#5A5A5A', minHeight: '100vh', overflowX: 'hidden' }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Assessment Library</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {assessments.length > 0 ? (
          assessments.map((assessment) => (
            <div key={assessment._id} style={assessmentCardStyle}>
              <h2>Assessment Date: {new Date(assessment.Date).toDateString()}</h2>
              <p>User: {username}</p>
              <p>Segment: {assessment.Segment.segmentName}</p>
              <p>Difficulty: {}</p>
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
