import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from "../../../utilities/decodeJwt";
import './mapPage.css';

const LynnWoods = () => {
  const [user, setUser] = useState({});
  const [parkDescription, setParkDescription] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  useEffect(() => {
    const fetchDataAndScript = async () => {
      try {
        // Fetch data
        const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/parks/trailparks`);
        const data = await response.json();

        // Find the description for Lynn Woods
        const park = data.find(park => park.parkName === "Lynn Woods");

        if (park) {
          // Set description
          const formattedDescription = formatDescriptionText(park.description) || 'No description available';
          setParkDescription(formattedDescription);
        } else {
          setParkDescription('Park not found');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const script = document.createElement("script");
      script.setAttribute(
        "src",
        "https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js"
      );
      document.getElementsByTagName("head")[0].appendChild(script);
    };

    fetchDataAndScript();
  }, []);

  // Function to format the description text
  function formatDescriptionText(description) {
    // Replace both '\n' and '\\n' with <br> tags for line breaks
    const formattedText = description.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');

    return formattedText;
  }

  const handleAssessButtonClick = () => {
    if (!user) {
      // Display alert if the user is not logged in
      setShowLoginAlert(true);
    } else {
      // Navigate to the assessment page if the user is logged in
      navigate('/selectSegment/6504c6fe69cfb7afbaebedc6');
      console.log('Assess Willowdale button clicked');
    }
  };

  const LoginAlertModal = ({ onClose }) => (
    <div className="login-alert-modal">
      <p>Please log in to use the Assess Your Skills feature.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescriptionDisplay = () => {
    if (showFullDescription || parkDescription.length <= 250) {
      return parkDescription;
    } else {
      return parkDescription.slice(0, 250) + '...';
    }
  };

  return (
    <div className="trailforks-widget-container">
      <div className="col">
        
        <header>
          <h1>Lynn Woods Trails</h1>
        </header>

        <div className="media-section">
          <img src="/images/LynnWoods.jpg" alt="Lynn Woods" />
        </div>

        <h3>Explore the trails in Lynn Woods and assess your abilities.</h3>
        <div className="border"> </div>
        {/* Skill Assessment Section */}
        <div className="skill-assessment-section">
          <h2>Want to assess your skills?</h2>
          <p>Ready to take your trail riding to the next level? Assess your skills at Lynn Woods! Navigate through diverse terrains, conquer challenging trails, and enjoy the thrill of the ride.</p>
          <button className="assess-button" onClick={handleAssessButtonClick}>
            Assess Your Skills
          </button>
        </div>

        {showLoginAlert && <LoginAlertModal onClose={() => setShowLoginAlert(false)} />}

        <div className="border"></div>

        <h2>Trail Map</h2>

        {/* Trailforks Widget Region Info */}
        <div
          className='container h-100 style'
          style={{
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            width: '100%', // Set to 100% for responsiveness
          }}
        >
          <div className='col'>
            <div
              className="TrailforksRegionInfo"
              data-w="100%"
              data-h="130px"
              data-rid="10873"
              data-counts="1"
              data-stats="1"
            ></div>

            {/* Trailforks Widget Map */}
            <div
              className="TrailforksWidgetMap"
              data-w="100%"
              data-h="800px"
              data-rid="10873"
              data-activitytype="1"
              data-maptype="trailforks"
              data-trailstyle="difficulty"
              data-controls="1"
              data-list="0"
              data-dml="1"
              data-layers="labels,poi,polygon,directory,region"
              data-z=""
              data-lat=""
              data-lon=""
              data-hideunsanctioned="0"
            ></div>

            {/* Description */}
            <div className="description-section">
              <h2>Description</h2>
              <div className="description-content">
                <p dangerouslySetInnerHTML={{ __html: getDescriptionDisplay() }}></p>
              </div>
              {parkDescription.length > 100 && (
                <button className="show-more-button" onClick={toggleDescription}>
                  {showFullDescription ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LynnWoods;
