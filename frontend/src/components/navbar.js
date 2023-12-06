import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const publicUser = () => {
    const parks = (
      <NavDropdown title="View Parks" id="nav-dropdown">
        <NavDropdown.Item href="/willowdale">Willowdale State Park</NavDropdown.Item>
        <NavDropdown.Item href="/gordon">Gordon College</NavDropdown.Item>
        <NavDropdown.Item href="/lynnwoods">Lynn Woods</NavDropdown.Item>
      </NavDropdown>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
        <nav>
          {parks}
        </nav>
      </div>
    );
  };

  const getBarDetails = () => {
    if (user) {
      // If logged in, show "Assess," "Profile," and "Logout" links
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', color: '#a299a3' }}>
          <Nav.Link style={{ paddingRight: '10px' }} href="/assessmentHome">Assess</Nav.Link>
          <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
        </div>
      );
    } else {
      // If not logged in, show "Login" and "Register" links
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', color: '#a299a3' }}>
          <Nav.Link href="/login" style={{ marginRight: '10px' }}>Login</Nav.Link>
          <Nav.Link href="/signup">Register</Nav.Link>
        </div>
      );
    }
  };

  return (
    <ReactNavbar bg="dark" variant="dark" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Container>
        <Nav>
          {publicUser()}
        </Nav>
        {getBarDetails()}
      </Container>
    </ReactNavbar>
  );
}
