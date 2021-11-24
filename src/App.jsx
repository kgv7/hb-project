import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/styles.css"
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import FindChargerPage from "./FindChargerPage";
import AddStationPage from "./AddStationPage";
import LoginRegisterForm from "./AccountContainer";
import ProfilePage from "./ProfilePage";
import AboutPage from "./AboutPage";
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
      <Switch>
      <div className="container-fluid">

        <Route exact path="/" component={Homepage} />
        
        <Route exact path="/find-charger" component={FindChargerPage} />

        <Route exact path="/add-station" component={AddStationPage} />

        <Route exact path="/about-charging" component={AboutPage} />

        <Route exact path="/account" component={LoginRegisterForm} />

        <Route exact path="/profile" component={ProfilePage} />

      </div>
    </Switch>
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
