import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState("");
  const [publicAssessments, setPublicAssessments] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  // handle logout button
  const handleLogout = () => {
    localStorage.clear();
    navigate("/willowdale");
    window.location.reload();
  };

  // handle profile picture upload
  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      // Send the file to the API endpoint for uploading
      const response = await axios.post("/api/upload-profile-picture", formData);

      // Get the uploaded image URL from the response
      const imageUrl = response.data.imageUrl;

      // Set the profile picture URL in the state
      setProfilePicture(imageUrl);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    navigate("/editUserProfile");
  };

  useEffect(() => {
    setUser(getUserInfo());
  
    // Fetch public assessments
    const fetchPublicAssessments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/api/public-assessments`);
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
  
    fetchPublicAssessments();
  }, []);
  

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <div style={{ background: "#5A5A5A", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Profile Picture */}
      <div style={{ width: "300px", padding: "20px", margin: "20px", background: "white", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center" }}>
        {profilePicture && (
          <img src={profilePicture} alt="Profile" width="200" />
        )}
        <input type="file" onChange={handleProfilePictureUpload} accept="image/*" />
      </div>

      {/* User Info */}
      <div style={{ width: "300px", padding: "20px", margin: "20px", background: "white", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center" }}>
        {profilePicture && <img src={profilePicture} alt="Profile" width="200" />}
        <h1>{user.username}</h1>
        <h3>{user.role}</h3>
        <h3>Followers: 0{user.followers}</h3>
        <h3>Following: 0{user.following}</h3>
        <h3>Posts: {user.posts}</h3>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px" }}>
          <Button className="me-2" onClick={handleLogout}>
            Log Out
          </Button>
          <Button className="me-2" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Public Assessments */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", fontFamily: "sans-serif", fontSize: "18px" }}>
        {publicAssessments.length > 0 ? (
          publicAssessments.map((assessment) => (
            <div key={assessment._id} style={assessmentCardStyle}>
              <h2>Assessment Date: {new Date(assessment.Date).toDateString()}</h2>
              <p>User: {user.username}</p>
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

export default PrivateUserProfile;
