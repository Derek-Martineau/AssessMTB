import React, { useEffect } from 'react';


const GordonCollege = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js"
    );
    document.getElementsByTagName("head")[0].appendChild(script);
  }, []);

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
            data-h="800px"
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
        </div>
      </div>
    </div>
  );
};

export default GordonCollege;
