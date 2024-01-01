import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './explore.css';

const PublicAssessments = () => {
  const [publicAssessments, setPublicAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsername = async (userId) => {
    try {
      if (!userId) {
        throw new Error('Invalid user ID');
      }
  
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getUserById`, {
        params: { userId },
      });
  
      return response.data._id; // Return user ID directly
    } catch (error) {
      console.error(`Error fetching user ID for user ID ${userId}:`, error);
      return null;
    }
  };
  
  

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
              // Fetch username using the user ID
              const userId = assessment.User._id;
              const username = await fetchUsername(userId);
              assessment.userId = userId || 'User ID Not Found'; // Use userId instead of username
            } catch (userError) {
              console.error(`Error fetching user ID for user ID ${assessment.User._id}:`, userError);
            }
        
            return assessment;
          })
        );
        
        setPublicAssessments(updatedPublicAssessments);
        

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
    <div className="feedContainer">
      <h1 className="heading">Welcome To The Explore Page!</h1>
      <div className="assessmentsContainer">
        {loading ? (
          <div className="loadingContainer">Loading...</div>
        ) : (
          publicAssessments.length > 0 ? (
            publicAssessments.map((assessment) => (
              <div key={assessment._id} className="assessmentCard">
                <div className="userInfo">
                  <img
                    src={`https://robohash.org/${assessment.userId}?set=set5`} // Displaying user ID in the image URL
                    alt="User Avatar"
                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                  />
                  <p className="username">{assessment.userId}</p>
                </div>
                <h2 className="cardTitle">Assessment Date: {new Date(assessment.Date).toDateString()}</h2>
                <p>Segment: {assessment.segmentName}</p>
                <p>Difficulty: {assessment.difficulty}</p>
                <p>Line Choices: {assessment.featureLines.map((line) => line.lineChoice).join(', ')}</p>
                <p>Score: {assessment.Score}</p>
              </div>
            ))) : (
            <p className="emptyState">No public assessments found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default PublicAssessments;
