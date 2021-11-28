import React from "react";
import { Link } from "react-router-dom";

import Loadingimage from "./img/lightningbolt.png";


export default function Homepage(props) {
    return (
      <div id="home-banner" className="row">
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <h1>Recharge</h1>
          <p className="lead">Fuel your car and your stomach</p>
        </div>
        <div className="row">
        <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
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
          </div>
    );
  }