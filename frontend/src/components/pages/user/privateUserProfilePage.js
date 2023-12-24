// Inside PrivateUserProfile.js
import React, { useState, useEffect, useCallback } from "react";
import { Button, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import getUserInfo from "../../../utilities/decodeJwt";
import "./privateProfile.css"; // Import the CSS file

const PrivateUserProfile = () => {
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState("");
  const [publicAssessments, setPublicAssessments] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // handle logout button
  const handleLogout = () => {
    localStorage.clear();
    navigate("/willowdale");
    window.location.reload();
  };

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

  const handleEditProfile = () => {
    navigate("/editUserProfile");
  };

  useEffect(() => {
    fetchUserFollowData();
  }, [fetchUserFollowData]);

  useEffect(() => {
    setUser(getUserInfo());

    // Fetch public assessments
    const fetchPublicAssessments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/results/user/public/${username}`);
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

    fetchPublicAssessments();
  }, []);

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          {profilePicture && <img src={profilePicture} alt="Profile" width="200" />}
        </div>
        <div className="user-info">
          <Image
            src={`https://robohash.org/${username}?set=set5`}
            roundedCircle
            style={{ width: '150px', height: '150px' }}
          />
          <div className="user-details">
            <h1>{user.username}</h1>
            <h3>{user.role}</h3>
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
            <div className="logout-edit-button">
              <Button className="me-2" onClick={handleLogout}>
              Log Out
            </Button>
            <Button className="me-2" onClick={handleEditProfile}>
              Edit Profile
            </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider and Header */}
      <hr className="hr-divider" />
      <h1 className="assessments-header">Assessments</h1>

      {/* Public Assessments */}
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
    </div>
  );
};

export default PrivateUserProfile;
