import React, { useEffect, useState } from 'react';

const TrailforksWidget = () => {
  const [parkDescription, setParkDescription] = useState('');

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
      const response = await fetch("http://localhost:8081/parks/trailparks");
      const data = await response.json();

      const willowdalePark = data.find(park => park.parkName === "Willowdale");

      if (willowdalePark) {
        setParkDescription(willowdalePark.description || 'No description available');
      } else {
        setParkDescription('Park not found');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div style={{ background: '#5A5A5A', minHeight: '100vh', overflowX: 'hidden' }}>
      <div className='container' style={{ color: 'white' }}>
        <div className='col'>
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
            data-h="800px"
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
          <div style={{ marginTop: '30px' }}>
            <h2>Description</h2>
            <div style={{ backgroundColor: '#333', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
              <p style={{ color: '#FFF', fontSize: '16px', lineHeight: '1.5' }}>{parkDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailforksWidget;
