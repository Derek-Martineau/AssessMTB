import React, { useEffect, useState } from 'react';

const TrailforksParkComponent = ({ parkName }) => {
  const [parkDescription, setParkDescription] = useState('');

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

  return (
    <div style={{ background: '#5A5A5A' }}>
      <div
        className='container h-100 style'
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
          width: '2000px',
        }}
      >
        <div className='col'>
          <div
            className='TrailforksRegionInfo'
            data-w='100%'
            data-h='130px'
            data-rid='23926'
            data-counts='1'
            data-stats='1'
          ></div>
          <div
            className='TrailforksWidgetMap'
            data-w='100%'
            data-h='800px'
            data-rid='23926'
            data-activitytype='1'
            data-maptype='trailforks'
            data-trailstyle='difficulty'
            data-controls='1'
            data-list='0'
            data-dml='1'
            data-layers='labels,poi,polygon,directory,region'
            data-z=''
            data-lat=''
            data-lon=''
            data-hideunsanctioned='0'
          ></div>
          <div>
            <h2>Description</h2>
            <div
              style={{
                backgroundColor: '#333',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '20px',
              }}
            >
              <p
                style={{
                  color: '#FFF',
                  fontSize: '16px',
                  lineHeight: '1.5',
                }}
                dangerouslySetInnerHTML={{ __html: parkDescription }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailforksParkComponent;
