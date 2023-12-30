import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Spinner } from 'react-bootstrap';
import axios from 'axios';
import getUserInfo from '../../../utilities/decodeJwt';
import FollowButton from '../../following/followButton';
import "./publicProfile.css"; 

export default function PublicUserList() {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [user, setUser] = useState({});
  const [publicAssessments, setPublicAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  const fetchUserFollowData = useCallback(async () => {
    try {
      // Fetch follower count
      const followerResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/following/followers/count/${username}`
      );
      setFollowerCount(followerResponse.data.followerCount);

      // Fetch following count
      const followingResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/following/following/count/${username}`
      );
      setFollowingCount(followingResponse.data.followingCount);
    } catch (error) {
      console.error('Error fetching user follow data:', error);
    }
  }, [username]);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const fetchPublicAssessments = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/user/public/${username}`
      );
      const updatedPublicAssessments = [];

      for (const assessment of response.data) {
        const segmentResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URI}/api/segments/${assessment.Segment}`
        );
        if (segmentResponse.data) {
          const segmentData = segmentResponse.data;
          assessment.segmentName = segmentData.segmentName;
          assessment.difficulty = segmentData.difficulty;
        }

        updatedPublicAssessments.push(assessment);
      }

      setPublicAssessments(updatedPublicAssessments);
    } catch (error) {
      console.error('Error fetching public assessments:', error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserFollowData();
    fetchPublicAssessments();
  }, [fetchUserFollowData, fetchPublicAssessments]); 

  if (!user) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h4>
          You must <a href="/login">log in</a> or <a href="/signup">register</a> to view this page
        </h4>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info">
          <div className="profile-image">
            <Image
              src={`https://robohash.org/${username}?set=set5`}
              roundedCircle
              style={{ width: '150px', height: '150px' }}
            />
          </div>
          <h1>{username}</h1>
          <div className="user-stats">
            <div>
              <h3>Followers: {followerCount}</h3>
            </div>
            <div>
              <h3>Following: {followingCount}</h3>
            </div>
            <div>
              <h3>Posts: {publicAssessments.length}</h3>
            </div>
          </div>
          <div className="follow-button">
            <FollowButton className="me-2" username={user.username} targetUserId={username} />
          </div>
        </div>
      </div>

      {/* Divider and Header */}
      <hr className="hr-divider" />
      <h1 className="assessments-header">Assessments</h1>

      {loading ? (
        <Spinner animation="border" role="status" className="mt-5">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="assessments-container">
          {publicAssessments.length > 0 ? (
            publicAssessments.map((assessment) => (
              <div key={assessment._id} className="assessment-card">
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
      )}
    </div>
  );
}
