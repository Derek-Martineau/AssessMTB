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
  
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/userID/${userId}`);
  
      return response.data.username || 'Username Not Found'; // Use the username or a default value
    } catch (error) {
      console.error(`Error fetching username for user ID ${userId}:`, error);
      return 'Username Not Found';
    }
  };

  useEffect(() => {
    const fetchPublicAssessments = async () => {
      try {
        console.log('Fetching public assessments...');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/public-assessments`);
        console.log('Fetched assessments data:', response.data);

        const updatedPublicAssessments = await Promise.all(
          response.data.map(async (assessment) => {
            const segmentResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/segments/${assessment.Segment}`);
            if (segmentResponse.data) {
              const segmentData = segmentResponse.data;
              assessment.segmentName = segmentData.segmentName;
              assessment.difficulty = segmentData.difficulty;
            }
        
            // Use user ID directly without accessing _id property
            const userId = assessment.User;
            console.log(`Assessment ID: ${assessment._id}, User ID: ${userId}`);
            
            // Fetch username using the user ID
            const username = await fetchUsername(userId);
            assessment.username = username;
        
            return assessment;
          })
        );
        
        console.log('Updated assessments data:', updatedPublicAssessments);
        setPublicAssessments(updatedPublicAssessments);
      } catch (error) {
        console.error("Error fetching public assessments:", error);
      } finally {
        setLoading(false);
        console.log('Assessments fetching completed.');
      }
    };

    fetchPublicAssessments();
  }, []);

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
                    src={`https://robohash.org/${assessment.User}?set=set5`} // Displaying user ID in the image URL
                    alt="User Avatar"
                    style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                  />
                  <p className="username">{assessment.username}</p>
                </div>
                <h2 className="cardTitle">Assessment Date: {new Date(assessment.Date).toDateString()}</h2>
                <p>Segment: {assessment.segmentName}</p>
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
