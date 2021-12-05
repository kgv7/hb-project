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
          <div className="col step-home">

                <i class="fas fa-charging-station fa-3x"></i>
                <h5 className="step-title">Step One:<p>Find a Charger</p></h5>
                <div className="step-text">Find a charger at your destination</div>
              </div>
          <div className="col step-home">

                <i class="fas fa-calculator fa-3x"></i>
                <h5 className="step-title">Step Two:
                <p>Calculate Charge Time</p></h5>
                <div className="step-text">Calculate out how long it will take to charge your car</div>
              </div>
  
              <div className="col step-home">
 
              <i class="fas fa-utensils fa-3x"></i>
                <h5 className="step-title">Step Three:<p>Choose a Restaurant</p></h5>
                <div className="step-text">Choose a restaurant that's within walking distance while your car is charging.</div>
              </div>
              </div>
      
          <div className="get-started-btn"><Link to="/find-charger"><button className="btn btn-outline-secondary">Get Started</button></Link></div>
          </section>

          </div>
    );
  }