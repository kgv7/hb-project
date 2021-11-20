import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/styles.css"
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import FindChargerPage from "./FindChargerPage";
import AddStationPage from "./AddStationPage";
import LoginRegisterForm from "./AccountContainer";
import ProfilePage from "./ProfilePage";
import {
  LoadScript
} from "@react-google-maps/api";


export default function App() {


  const googleMapAPILibraries = ['places']
  const token = sessionStorage.getItem("token")
  const googleMapsApiKey= "AIzaSyB6L9_qNTTsWQcr7L9gH-bItjixBdqdY5U"
  

  return (
  <div>
    <BrowserRouter>
      <Navbar logo="./img/placeholder-logo.png" brand="Recharge"/>
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/find-charger">
          <FindChargerPage />
        </Route>
        <Route exact path="/add-station">
          <AddStationPage />
        </Route>
        <Route exact path="/account">
          <LoginRegisterForm/>
        </Route>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
      </div>
    </BrowserRouter>

    <LoadScript
      id="LoadScriptID"
      googleMapsApiKey={googleMapsApiKey}
      libraries={googleMapAPILibraries}
      >
   </LoadScript>
   </div>
  );
  };

  
  ReactDOM.render(<App />, document.querySelector("#root"));
