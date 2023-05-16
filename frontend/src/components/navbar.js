import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';


// display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // <Nav.Link href="/home">Home</Nav.Link>
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])

  const publicUser = () => {
   if(user ) {
     return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <nav>
        <Nav.Link href="/map">MapPage</Nav.Link>
      </nav>
      <div>
        <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
      </div>
    </div>
    
     )
   } else {
     return (
      <nav>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Nav.Link href="/map">MapPage</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Register</Nav.Link>
              
            </div>
      </nav>
     )
   }
  }
  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
         {publicUser()}

        </Nav>
      </Container>
    </ReactNavbar>
  );
}
