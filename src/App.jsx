import React from "react";
import { BrowserRouter, Route,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import FindChargerPage from "./FindChargerPage";
import AddStationPage from "./AddStationPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import {
  useJsApiLoader,
  LoadScript
} from "@react-google-maps/api";
// import useToken from "./Global";



export default function App() {


  const googleMapAPILibraries = ['places']
  const token = sessionStorage.getItem("token")
  const googleMapsApiKey= "AIzaSyB6L9_qNTTsWQcr7L9gH-bItjixBdqdY5U"
  

  return (
  <div>
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="./img/placeholder-logo.png" brand="Recharge"/>
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/find-charger">
          <FindChargerPage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/add-station">
          <AddStationPage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/login">
          <LoginPage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/register">
          <RegisterPage/>
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/profile">
          <ProfilePage />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>

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