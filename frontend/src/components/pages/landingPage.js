import React, {} from 'react'
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
    
    return (
        <Card style={{ width: '30rem' }} className="mx-2 my-2">
        <Card.Body>
          <Card.Title>Welocme to AssessMTB</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">How well do you ride the north shore?</Card.Subtitle>
          <Card.Text>
          </Card.Text>
          <Card.Link href="/signup">Sign Up</Card.Link>
          <Card.Link href="/login">Login</Card.Link>
        </Card.Body>
      </Card>
    )
}

export default Landingpage