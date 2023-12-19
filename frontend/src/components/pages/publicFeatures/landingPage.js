import React from 'react';
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
  const styles = `
    /* CSS for the Landing Page */
    .landing-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f8f8f8; /* Background color for the entire page */
    }

    .landing-card {
      width: 30rem;
      text-align: center;
      border: none;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      background-color: #fff; /* Background color for the card */
    }

    .landing-title {
      font-size: 2.5rem;
      color: #333; /* Title text color */
      margin-bottom: 10px;
    }

    .landing-subtitle {
      font-size: 1.2rem;
      color: #777; /* Subtitle text color */
      margin-bottom: 20px;
    }

    .landing-buttons {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .landing-button {
      text-decoration: none;
      padding: 10px 20px;
      border: none;
      background-color: #007bff; /* Button background color */
      color: #fff; /* Button text color */
      font-size: 1.2rem;
      border-radius: 5px;
      margin: 0 10px;
      transition: background-color 0.3s;
    }

    .landing-button:hover {
      background-color: #0056b3; /* Button background color on hover */
    }
  `;

  return (
    <div className="landing-container" style={{background: "#5A5A5A"}}>
      <Card className="landing-card">
        <Card.Body>
          <Card.Title className="landing-title">Welcome to AssessMTB</Card.Title>
          <Card.Subtitle className="landing-subtitle">
            How well do you ride the north shore?
          </Card.Subtitle>
          <Card.Text></Card.Text>
          <div className="landing-buttons">
            <Card.Link href="/signup" className="landing-button">
              Sign Up
            </Card.Link>
            <Card.Link href="/login" className="landing-button">
              Login
            </Card.Link>
          </div>
        </Card.Body>
      </Card>
      <style>{styles}</style>
    </div>
  );
};

export default Landingpage;
