import React from 'react';
import { Button, Container, Row, Col, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const parks = [
    {
      image: 'images/GordonCollege.jpg',
      name: 'Gordon College Park',
      buttonText: 'Explore Gordon College Park',
      link: '/gordon',
    },
    {
      image: 'images/LynnWoods.jpg',
      name: 'Lynn Woods Park',
      buttonText: 'Explore Lynn Woods Park',
      link: '/lynnwoods',
    },
    {
      image: 'images/willowdale.jpeg',
      name: 'Willowdale State Forest',
      buttonText: 'Explore Willowdale State Forest',
      link: '/willowdale',
    },
  ];

  const navigateToCarouselItem = (index) => {
    const selectedPark = parks[index];
    navigate(selectedPark.link);
  };

  return (
    <div>
      <div className="hero-section">
        <div className="overlay"></div>
        <Container>
          <Row>
            <Col md={12}>
              <h1 className="landing-title">Welcome to AssessMTB</h1>
              <p className="landing-text">Assess and enhance your mountain biking skills</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="landing-container">
        <Container>
          <Row id="features" className="section">
            <Col md={12}>
              <h2>What is AssessMTB?</h2>
              <p className="landing-text">
                Most social fitness platforms for mountain biking (Strava, Trailforks, etc.) track overall ride metrics, but AssessMTB goes beyond. It assesses your true skill by understanding the specific paths you take on a trail segment. This unique approach allows us to rank your performance relative to others.
              </p>
            </Col>
          </Row>
          <div className="carousel-section">
            <Carousel style={{ height: '300px' }}>
              {parks.map((park, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100 custom-carousel-image" src={park.image} alt={park.name} />
                  <Carousel.Caption>
                    <h3>{park.name}</h3>
                    <p>Explore and enhance your mountain biking skills at {park.name}</p>
                    <Button variant="light" onClick={() => navigateToCarouselItem(index)}>
                      {park.buttonText}
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <Row className="section">
            <Col md={12}>
              <h2>Our Process</h2>
              <p className="landing-text">
                Most social fitness platforms for mountain biking, such as Strava and Trailforks, excel in tracking overall ride metrics like total time, time on each trail, speed, and biometrics. However, they fall short in assessing the true skill of a mountain biker. These platforms cannot comprehend the specific parts of the trail a rider completed or avoided. <br>
                </br><br></br>AssessMTB bridges this gap by developing an application that collects metrics and ranks the relative true performance of mountain bikers on a given trail. The application achieves this by asking riders a series of questions about the path they took on a trail segment. Based on the answers, it assigns a points-based system depending on the level of difficulty of the given path segment.<br></br> <br></br>For enhanced accuracy, users can integrate their Strava data. The application also allows users to easily share and compare results with friends, fostering a dynamic and engaging community. Our goal is to create a more comprehensive and insightful platform that goes beyond generic ride statistics, offering mountain bikers a nuanced understanding of their skills and fostering a sense of friendly competition and camaraderie within the biking community.
              </p>
            </Col>
          </Row>
          <Row id="social-media" className="section">
            <Col md={12}>
              <h2>Social Media Integration</h2>
              <p className="landing-text">
                AssessMTB isn't just about personal performance; it's about building a vibrant and supportive community of mountain biking enthusiasts. Here's how our social media features take your biking experience to the next level:
              </p>
            </Col>
            <Col md={6}>
              <h3>Connect with Friends</h3>
              <p className="landing-text">
                Connect with friends within the AssessMTB app. Follow their progress, cheer them on, and discover new trails together. The application fosters a sense of camaraderie by creating a space where bikers can share their progression together.
              </p>
            </Col>
            <Col md={6}>
              <h3>Strava Integration</h3>
              <p className="landing-text">
                Seamlessly integrate your Strava data for a more comprehensive analysis of your rides. AssessMTB leverages Strava's extensive features while providing additional insights into your skills on specific trail segments.
              </p>
            </Col>
            <Col md={6}>
              <h3>Share Your Achievements</h3>
              <p className="landing-text">
                With AssessMTB, you can easily share your trail segments, achievements, and challenges completed to your feed page. Let your friends and followers know about your latest biking adventures and accomplishments.
              </p>
            </Col>

            <Col md={6}>
              <h3>Feed Page</h3>
              <p className="landing-text">
              
Ensure that you showcase your skills to receive the recognition you deserve. Embark on spirited competitions with your friends and fellow bikers, aiming to highlight your true prowess on your preferred trail segments. The competitive element enhances the thrill of your mountain biking adventure, adding an exhilarating dimension to the experience.              </p>
            </Col>

          </Row>
          <Row id="contact" className="contact-section">
            <Col md={12}>
              <h2>Contact Us</h2>
              <p className="landing-text">
                Have questions or feedback? Reach out to us!
              </p>
              <div className="contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button type="button">Send Message</button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
