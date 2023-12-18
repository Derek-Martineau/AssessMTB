import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';
import FollowButton from '../following/followButton';

export default function PublicUserList() {
  const [publicAssessments, setPublicAssessments] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [user, setUser] = useState({});
  const [publicPosts, setPublicPosts] = useState([]); // Add this line
  const { username } = useParams();

  /*const fetchUserFollowData = useCallback(async () => {
    try {
      // Fetch follower count
      const followerResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/followers/count/${username}`
      );
      setFollowerCount(followerResponse.data.count);

      // Fetch following count
      const followingResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/following/count/${username}`
      );
      setFollowingCount(followingResponse.data.count);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  }, [username]);
 */ 

  // Ensures the page starts at the top when the component is first rendered
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);
  

  const fetchPublicAssessments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/user/public/${username}`);
      // Log the data to the console for debugging
      console.log("Response data:", response.data);

      // Fetch segment data for each assessment and update the state
      const updatedPublicAssessments = [];

      for (const assessment of response.data) {
        const segmentResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/segments/${assessment.Segment}`);
        if (segmentResponse.data) {
          const segmentData = segmentResponse.data;
          assessment.segmentName = segmentData.segmentName;
          assessment.difficulty = segmentData.difficulty;
        }

        updatedPublicAssessments.push(assessment);
      }

      setPublicAssessments(updatedPublicAssessments);
    } catch (error) {
      console.error("Error fetching public assessments:", error);
    }
  };

  useEffect(() => {
    fetchPublicAssessments();
  }, []); // Empty dependency array to run only once

  if (!user) {
    return (
      <div style={{ textAlign: "center" }}>
        <h4>
          You must <a href="/login">log in</a> or <a href="/signup">register</a> to view this page
        </h4>
      </div>
    );
  }

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col md={4} className="text-center mb-3">
            <Image
              src={"https://robohash.org/" + username + "?set=set5"}
              roundedCircle
              style={{ width: '150px', height: '150px' }}
            />
            <h3>{username}</h3>
            <FollowButton
              className="mt-2 btn-sm"
              username={user.username}
              targetUserId={username}
            />
            <div className="mt-2">
              <div>Followers: {followerCount}</div>
              <div>Following: {followingCount}</div>
            </div>
          </Col>
        </Row>
      </Container>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: "sans-serif", fontSize: "18px" }}>
        {publicAssessments.length > 0 ? (
          publicAssessments.map((assessment) => (
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
          <p>No public assessments found.</p>
        )}
      </div>
    </div>
  );
}

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