import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// display our Navbar
export default function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const publicUser = () => {
    
    const parks = <NavDropdown title="View Parks" id="nav-dropdown">
    <NavDropdown.Item href="/willowdale">Willowdale State Park</NavDropdown.Item>
    <NavDropdown.Item href="/gordon">Gordon College</NavDropdown.Item>
    <NavDropdown.Item href="/lynnwoods">Lynn Woods</NavDropdown.Item>
  </NavDropdown>;
  //logged in user
    if (user) {
      return (
        <div is="outerContainer" style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
          <nav>
            <NavDropdown title="View Parks" id="nav-dropdown">
            <NavDropdown.Item href="/willowdale">Willowdale State Park</NavDropdown.Item>
            <NavDropdown.Item href="/gordon">Gordon College</NavDropdown.Item>
            <NavDropdown.Item href="/lynnwoods">Lynn Woods</NavDropdown.Item>
          </NavDropdown>
          </nav>

        </div>
      );
      //not logged in user
    } else {
      return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <nav>
          ${parks}
          </nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
            
          </div>
        
      );
    }
  }

  const getBarDetails = () => {
    //if logged in show profile
    if(user){
      return (      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', color:'#a299a3' }}>
      <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
    </div>)
    //if not logged in show login and register
    }else {
      return (
 
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Register</Nav.Link>

        </div>
      
    );
    }
  };

  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav >
          {publicUser()}
        </Nav>
       {getBarDetails()}
      </Container>

    </ReactNavbar>
  );
}
