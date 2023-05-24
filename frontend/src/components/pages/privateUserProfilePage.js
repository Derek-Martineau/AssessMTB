import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import axios from "axios";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  // handle logout button
  const handleLogout = () => {
    localStorage.clear();
    navigate("/willowdale");
    window.location.reload();
  };
  //handle profile picture upload
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
    navigate("/edit-profile");
  };

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          {profilePicture && (
            <img src={profilePicture} alt="Profile" width="200" />
          )}
          <input type="file" onChange={handleProfilePictureUpload} accept="image/*" />
        </div>
        <div className="col-md-9">
        {profilePicture && <img src={profilePicture} alt="Profile" width="200" />}
   
          <h1>{user.username}</h1>
          <h3>{user.role}</h3>
          <h3>Followers: {user.followers}</h3>
          <h3>Following: {user.following}</h3>
          <h3>Posts: {user.posts}</h3>
          <div className="text-center">
            <>
              <Button className="me-2" onClick={handleShow}>
                Log Out
              </Button>
              <Button className="me-2" onClick={handleEditProfile}>
                Edit Profile
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Log Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleLogout}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateUserProfile;
