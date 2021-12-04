import React from "react";
import { Link } from "react-router-dom";


export default function Homepage(props) {
    return (
      // <div className="container">
      <div>
        <div className="row position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" id="home-banner">
        {/* <div 
        className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center"
        > */}
          <div id="logo-header"><img src="./img/recharge-logo-white.png"/></div>
          <p className="lead">Fuel your car and your stomach</p>
        {/* </div> */}
        </div>

        <div className="row d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        {/* <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3"> */}
        <div className="card-deck">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Step One: Find a Charger</h5>
                <p className="card-text">Use Google Maps to find a charger at your destination</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Step Two: Calculate Charge Time</h5>
                <p className="card-text">Find out how long it will take to charge your car</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Step Three: Find Walkable Restaurants</h5>
                <p className="card-text">Your charge time may be long, so find some walkable restaurants near the charger you select.</p>
              </div>
            </div>
          </div>
          </div><Link to="/find-charger"><button>Get Started</button></Link>
          </div>
          // </div>
    );
  }