import React, { useEffect } from 'react';
import {useState} from 'react';

const backgroundStyle = { backgroundColor: '#999999' };

const TrailforksWidget = () => {
  // This is the script that loads the Trailforks widget
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://es.pinkbike.org/ttl-86400/sprt/j/trailforks/widget.js"
    );
    document.getElementsByTagName("head")[0].appendChild(script);
    
  }, []);

  return (
    //set background color to grey
    <div   style={{ background: '#5A5A5A' }}>
     
    <div className='container h-100 style'
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
          data-rid="5395"
          data-counts="1"
          data-stats="1"
        ></div>
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
         <div>
      <p>
      Why would anyone want to ride in she Willowdale State Forest when right across the street is the much better known Bradley Palmer State Forest? Well, maybe it's because the forest's 2400 acres hold over 40 miles of trails. Or maybe it's because you normally have the entire place to yourself. Whatever the reason Willowdale State Forest should be high on everyone's list for exploration. </p>
  
 <p> Willowdale State Forest is located mostly in the town of Ipswich. Many of the forest's trails are easy doubletracks, which makes Willowdale an excellent place for family friendly riding. And there are a three color coded marked loops to follow. </p>
  
 <p> The forest's singletrack trails are some of the most enjoyable trails that I have ever ridden. The best of these lay in northern section of the Pine Swamp area. The forest is divided up into two main parecels. The aforementioned Pine Swamp area and the Hood Pond area. Most people park on Ipswich Road alongside the Ipswich River. You'll find numbered markers at all of the forest's main intersections. Bring a copy of the maps and you'll always know where you are. The Bay Circuit Trail runs through Willowdale and is marked by white blazes. </p>
  
 <p> Plan to spend more than one day exploring Willowdale's many trails. Looking for more riding? Well, just across that bridge on the Ipswich River you'll find Bradley Palmer State Park and Georgetown-Rowley State Forest is also nearby. And for a truely epic ride you can link all three together. </p>
  
 <p> For a good exploratory ride print out the Pine Swamp MAP. Then take a highlighter and outline the following route. Head north into the forest from the parking area and turn left at marker 31. Follow that trail to 35 and then to 33, 36, 45, 49, 30, 12, 11, 40, 43, 41, 39, 38, 37 27, 26, 25, 24 and then take the Bay Circuit Path down through 4, 5, 60, 30, 32, 22 & 42. At that point you'll have over 9 miles on your clock and will have sampled some of Willowdale's best trails. Oh And remember all those trails leading off from this ride? They are just more reasons to head out again. </p>
  
 <p> Want something else to do while you're there? Check out the Willodale Estate in the contiguous Bradley Plamer State Forest. Or, rent a kayak or a canoe a half mile away at Foote Brothers.</p>
  
 <p> Looking for even more trails? Check out the "Discover Hamilton" trail MAP.</p>
  
 <p> The GPS File available for download is a nice 2.5 hour intermediate loop at Willowdale. Please note that it crosses a busy road from one section of Willowdale to the other side. It also comes out on Ipswich Road for a short bit before it comes back into the park.</p>
  
  <p>
  source: NEMBA <br />
  Primary Trail Type: Cross-Country <br />
  eBikes Allowed: No <br />
  Land Status: State Forest <br />
  </p>
  <p>
  Access Info: <br />
  Note that there are two parking locations for Willowdale: one on 259 Linebrook Rd. in Ipswich and the other at 280 Ipswich Rd in Topsfield. The most common for mountain bikers is Linebrook.</p>
  <p>
  Disclaimer: <br />
  No alcohol <br />
  No motorized vehicles <br />
  No hunting east of Route 1 <br />
  Stay on designated trails and roads. <br />
</p>

      </div>
    </div>
    </div>
    </div>
   
  );
};

export default TrailforksWidget;