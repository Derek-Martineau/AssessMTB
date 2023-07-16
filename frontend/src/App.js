import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import TrailforksWidget from "./components/pages/mapPage";
import EditUserProfile from "./components/pages/editUserPage";
import GordonCollege from "./components/pages/gordonCollege";
import LynnWoods from "./components/pages/lynnWoods";
import CallParks from "./components/pages/newAssessment"
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";

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
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/willowdale" element={<TrailforksWidget />} />
          <Route path="/gordon" element={<GordonCollege />} />
          <Route path="/lynnwoods" element={<LynnWoods />} />
          <Route path="/editUserProfile" element={<EditUserProfile />} />
          <Route path="/newAssessment" element={<CallParks />}/>
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
