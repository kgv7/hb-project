import React from "react";
import { Link } from "react-router-dom";


export default function Homepage(props) {
    return (
      // <div className="container">
      <div>
        <div className="row position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" id="home-banner">
          <div id="logo-header"><img src="./img/recharge-logo-white.png" class="img-fluid"/></div>
          <p className="tagline">Fuel your car and your stomach</p>
    
        </div>

      <section id="steps">
      <h1 className="steps-header">How It Works</h1>
        <div className="row d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
          <div className="col md-4 step-home">

                <i class="fas fa-charging-station fa-3x"></i>
                <div className="step-title"><p>Step One:</p><p>Find an EV Charger</p></div>
                <div className="step-text">Find a charger at your destination.</div>
          </div>
          <div className="col md-4 step-home">

                <i class="fas fa-calculator fa-3x"></i>
                <div className="step-title"><p>Step Two:</p>
                <p>Calculate Charge Time</p></div>
                <div className="step-text">Calculate out how long it will take to charge your car.</div>
              </div>
  
              <div className="col md-4 step-home">
 
              <i class="fas fa-utensils fa-3x"></i>
                <div className="step-title"><p>Step Three:</p><p>Choose a Restaurant</p></div>
                <div className="step-text">Choose a restaurant that's within walking distance while your car is charging.</div>
              </div>
              </div>
      
          <div className="get-started-btn"><Link to="/find-charger"><button className="btn btn-outline-secondary">Get Started</button></Link></div>
          </section>

          </div>
    );
  }