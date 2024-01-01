import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mapPage.css';

const TrailforksParkComponent = () => {
  const [parkDescription, setParkDescription] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      'https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js'
    );
    document.getElementsByTagName('head')[0].appendChild(script);

    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/parks/trailparks`
      );
      const data = await response.json();

      const park = data.find((park) => park.parkName === "Gordon College");

      if (park) {
        const formattedDescription =
          formatDescriptionText(park.description) || 'No description available';
        setParkDescription(formattedDescription);
      } else {
        setParkDescription('Park not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function formatDescriptionText(description) {
    const formattedText = description.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');
    return formattedText;
  }

  const handleAssessButtonClick = () => {
    navigate('/selectSegment/6503d0cd52bfd3de00f04c47');
    console.log('Assess Gordon College button clicked');
  };

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
          <h1>Gordon College Trails</h1>
        </header>

        <div className="media-section-gordon">
          <img src="images/gordon-lake.jpg" alt="Gordon College Lake View" />
         
        </div>

          <h3>Explore the trails in Gordon College and assess your abilities.</h3>
          <div class = "border"> </div>
          {/* Skill Assessment Section */}
        <div className="skill-assessment-section">
          <h2>Want to assess your skills?</h2>
          <p>Ready to take your trail riding to the next level? Assess your skills at Gordon College! Navigate through diverse terrains, conquer challenging trails, and enjoy the thrill of the ride.</p>
          <button className="assess-button" onClick={handleAssessButtonClick}>
            Assess Your Skills
          </button>
        </div>
        <div class = "border"> </div>
          <h2>Trail Map</h2>

        <div
          className="TrailforksRegionInfo"
          data-w="100%"
          data-h="130px"
          data-rid="23926"
          data-counts="1"
          data-stats="1"
        ></div>
        <div
          className="TrailforksWidgetMap"
          data-w="100%"
          data-h="500px"
          data-rid="23926"
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
  );
};

export default TrailforksParkComponent;
