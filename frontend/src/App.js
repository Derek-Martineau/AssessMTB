import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/publicFeatures/landingPage";
import HomePage from "./components/pages/publicFeatures/homePage";
import Login from "./components/pages/publicFeatures/loginPage";
import Signup from "./components/pages/user/registerPage";
import TrailforksWidget from "./components/pages/publicFeatures/mapPage";
import EditUserProfile from "./components/pages/user/editUserPage";
import GordonCollege from "./components/pages/publicFeatures/gordonCollege";
import LynnWoods from "./components/pages/publicFeatures/lynnWoods";
import CallParks from "./components/pages/assessmentWalkthrough/newAssessment"
import PrivateUserProfile from "./components/pages/user/privateUserProfilePage";
import getUserInfo from "./utilities/decodeJwt";
import CallSegments from "./components/pages/assessmentWalkthrough/selectSegment";
import CallFeature from "./components/pages/assessmentWalkthrough/selectFeature";
import PostResults from "./components/pages/assessmentWalkthrough/assessResultPage";
import ViewLibrary from "./components/pages/user/assessmentLibrary";
import UploadImages from "./components/images/uploadImages";
import ViewImages from "./components/images/viewImages";
import PublicProfilePage from "./components/pages/user/publicProfilePage";
import FeedPage from "./components/pages/feedPage/feedPage";

export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile/:username" element={<PrivateUserProfile />} />
          <Route path="/publicProfilePage/:username" element={<PublicProfilePage />} />
          <Route path="/willowdale" element={<TrailforksWidget />} />
          <Route path="/gordon" element={<GordonCollege />} />
          <Route path="/lynnwoods" element={<LynnWoods />} />
          <Route path="/editUserProfile" element={<EditUserProfile />} />
          <Route path="/newAssessment" element={<CallParks />}/>
          <Route path="/selectSegment/:trailparkId" element={<CallSegments />}/>
          <Route path="/selectSegment/:segmentId/:userId/selectFeature" element={<CallFeature />}/>
          <Route path="/results/:assessmentId" element={<PostResults />}/>
          <Route path="/assessmentLibrary/:username" element={<ViewLibrary />}/>
          <Route path="/uploadImages" element={<UploadImages />} />
          <Route path="/viewImages" element={<ViewImages />} />
          <Route path="/followingFeed" element={<FeedPage />} />
          
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
