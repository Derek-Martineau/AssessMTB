import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './mapPage.css';

const TrailforksWidget = () => {
  const [parkDescription, setParkDescription] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js"
    );
    document.getElementsByTagName("head")[0].appendChild(script);

    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/parks/trailparks`);
      const data = await response.json();

      const willowdalePark = data.find((park) => park.parkName === "Willowdale State Forest");

      if (willowdalePark) {
        console.log("Retrieved Description:", willowdalePark.description);

        const formattedDescription = formatDescriptionText(willowdalePark.description) || 'No description available';
        setParkDescription(formattedDescription);
      } else {
        setParkDescription('Park not found');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Function to format the description text
  function formatDescriptionText(description) {
    // Replace both '\n' and '\\n' with <br> tags for line breaks
    const formattedText = description.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');

    return formattedText;
  }

  const handleAssessButtonClick = () => {
    navigate('/selectSegment/6503bc298626465bf656c7e0');
    console.log('Assess Willowdale button clicked');
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
          <h1>Willowdale State Forest Trails</h1>
        </header>

        <div className="media-section">
          <img src="images/willowdale-west-sign.jpg" alt="Willowdale State Forest" />
         
        </div>

          <h3>Explore the trails in Willowdale State Forest and assess your abilities.</h3>

          {/* Skill Assessment Section */}
        <div className="skill-assessment-section">
          <h2>Want to assess your skills?</h2>
          <p>Ready to take your trail riding to the next level? Assess your skills at Willowdale State Park! Navigate through diverse terrains, conquer challenging trails, and enjoy the thrill of the ride.</p>
          <button className="assess-button" onClick={handleAssessButtonClick}>
            Assess Your Skills
          </button>
        </div>
        <h3> </h3>
          <h2>Trail Map</h2>
        {/* Trailforks Widget Region Info */}
        <div
          className="TrailforksRegionInfo"
          data-w="100%"
          data-h="130px"
          data-rid="5395"
          data-counts="1"
          data-stats="1"
        ></div>

        {/* Trailforks Widget Map */}
        <div
          className="TrailforksWidgetMap"
          data-w="100%"
          data-h="500px"
          data-rid="5395"
          data-activitytype="1"
          data-maptype="trailforks"
          data-trailstyle="difficulty"
          data-controls="1"
          data-list="0"
          data-dml="1"
          data-layers="labels,poi,polygon,directory,region"
          data-z="12.760397332809067"
          data-lat="42.671076777593186"
          data-lon="-70.91758500000003"
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

export default TrailforksWidget;
