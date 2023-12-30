import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PublicAssessments = () => {
  const [publicAssessments, setPublicAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicAssessments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/public-assessments`);
    
        const updatedPublicAssessments = await Promise.all(
          response.data.map(async (assessment) => {
            const segmentResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/segments/${assessment.Segment}`);
            if (segmentResponse.data) {
              const segmentData = segmentResponse.data;
              assessment.segmentName = segmentData.segmentName;
              assessment.difficulty = segmentData.difficulty;
            }
    
            try {
              const userResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/users/${assessment.User}`);
              if (userResponse.data) {
                const userData = userResponse.data;
                assessment.username = userData.username;
              }
            } catch (userError) {
              console.error(`Error fetching user details for user ID ${assessment.User}:`, userError);
    
              // Handle 404 error more gracefully
              if (userError.response && userError.response.status === 404) {
                // User not found, you can set a default username or handle it as appropriate
                assessment.username = 'User Not Found';
              } else {
                // Handle other errors as needed
              }
            }
    
            return assessment;
          })
        );
    
        setPublicAssessments(updatedPublicAssessments);
      } catch (error) {
        console.error("Error fetching public assessments:", error);
      } finally {
        setLoading(false);
      }
    };    

    fetchPublicAssessments();
  }, []);

  return (
    <div>
      <h1>Public Assessments</h1>
      <div className="assessments-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          publicAssessments.length > 0 ? (
            publicAssessments.map((assessment) => (
              <div key={assessment._id} className="assessment-card">
                <h2>Assessment Date: {new Date(assessment.Date).toDateString()}</h2>
                <p>User: {assessment.username}</p>
                <p>Segment: {assessment.segmentName}</p>
                <p>Difficulty: {assessment.difficulty}</p>
                <p>Line Choices: {assessment.featureLines.map((line) => line.lineChoice).join(', ')}</p>
                <p>Score: {assessment.Score}</p>
              </div>
            ))) : (
              <p>No public assessments found.</p>
            )
        )}
      </div>
    </div>
  );
};

export default PublicAssessments;
