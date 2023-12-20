import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserInfo());
    fetchUsers().then(users => setUsers(users));
  }, []);

  const navigateToHome = () => {
    navigate("/");
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getAll`);
      const usersData = await response.json();
  
      // Ensure that the received data is an array
      const usersArray = Array.isArray(usersData) ? usersData : [];
  
      setUsers(usersArray);
      return usersArray;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  

  const handleSearch = () => {
    // Implement search logic based on the searchQuery
    // Search should be based on the 'username' property of users
  
    // Ensure that users is not empty before filtering
    if (users.length === 0) {
      console.log("No users available for search.");
      return;
    }
  
    const filteredUsers = users.filter(user => {
      return user.username.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
    // Assuming you want to navigate to the publicProfilePage of the first matching user
    if (filteredUsers.length > 0) {
      const usernameToNavigate = filteredUsers[0].username;
      navigate(`/publicProfilePage/${usernameToNavigate}`);
      // Reload the page after navigation
    window.location.reload();
    }
  
    // Optionally, you can log the filteredUsers for debugging purposes
    console.log("Filtered Users:", filteredUsers);
  };
  

  const publicUser = () => {
  const parks = (
    <NavDropdown title="View Parks" id="nav-dropdown" style={{ color: '#FFF' }}>
      <NavDropdown.Item href="/willowdale">Willowdale State Park</NavDropdown.Item>
      <NavDropdown.Item href="/gordon">Gordon College</NavDropdown.Item>
      <NavDropdown.Item href="/lynnwoods">Lynn Woods</NavDropdown.Item>
    </NavDropdown>
  );


    const imageLink = (
      <Nav.Link href="#" onClick={navigateToHome} style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://icon2.cleanpng.com/20181128/ugw/kisspng-portable-network-graphics-clip-art-silhouette-imag-5bff6f9bbe3338.4270034315434669077791.jpg"
          alt="Mountain silhouette"
          style={{ width: '30px', height: '30px', marginRight: '10px' }}
        />
      </Nav.Link>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {imageLink}
        <nav>
          {parks}
        </nav>
      </div>
    );
  };

  const getBarDetails = () => {
    if (user) {
      // If logged in, show "Assess," "Profile," "Feed," and "Logout" links
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', color: '#FFF' }}>
          <Nav.Link href="/followingFeed" style={{ marginRight: '15px' }}> Feed</Nav.Link>
          <NavDropdown title="Assess" style={{ paddingRight: '15px' }}>
            <NavDropdown.Item href="/newAssessment">New Assessment</NavDropdown.Item>
            <NavDropdown.Item href={`/assessmentLibrary/${user.username}`}>Assessment Library</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href={`/privateUserProfile/${user.username}`}>{user.username}</Nav.Link>
        </div>
      );
    } else {
      // If not logged in, show "Login" and "Register" links
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', color: '#FFF' }}>
          <Nav.Link href="/login" style={{ marginRight: '10px' }}>Login</Nav.Link>
          <Nav.Link href="/signup">Register</Nav.Link>
        </div>
      );
    }
  };

  return (
    <ReactNavbar variant="dark" style={{ background:"#000000", position: 'sticky', top: 0, zIndex: 100 }}>
      <Container>
        <Nav>
          {publicUser()}
        </Nav>

        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search for a user"
              className="mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
          <Button variant="outline-light" onClick={handleSearch}>Search</Button>
        </div>

        {getBarDetails()}
      </Container>
    </ReactNavbar>
  );
}
