import React from "react";
import { useHistory, Link, Router} from "react-router-dom";

export default function ProfilePage(props) {
    console.log("hi")

    return(
        <React.Fragment>
            <div className="row position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <h1>About Recharge</h1>
            While buying an electric vehicle might be easier these days, finding a convenient charger is not as easy. 
            Recharge helps users find electric vehicle charging stations based on their destinations, calculate the amount 
            of time it takes to charge, and provides suggestions on walkable restaurants to visit while you're charging  
            up your car. 
            <p>Learn more about EV Charging below:</p>
            </div>
        
        <h3>EV Charging Levels</h3>
        <div className="row">
        <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div className="card-deck">
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Level One:</h5>
                <div className="card-text">
                    <p>Voltage: 120V</p>
                    <p>Charging Time: 3-5 miles of range per hour</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Level Two:</h5>
                <div className="card-text">
                    <p>Voltage: 240V</p>
                    <p>Charging Time: 10-20 miles of range per hour</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Level Three:</h5>
                <div className="card-text">                    
                    <p>Voltage: 208V or 480V 3-Phase AC</p>
                    <p>Charging Time: 80% charge in 20-30 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <h3>EV Charging Station Companies</h3>
        When you charge your vehicle, you may need to download a mobile app in order to charge your car. 
        Check out the different companies to learn how to use their mobile apps by clicking the logos.

        <div className="row">
        <div className="col-lg-2">
            <a target="_blank" href="https://www.tesla.com/supercharger">
                <img className="logo-box" src="./img/Tesla_logo.png"></img>
            </a>
        </div>
        <div className="col-lg-5">
            <a target="_blank" href="https://www.chargepoint.com/drivers/charging-101/">
                <img className="logo-box" src="./img/ChargePoint_logo.png"></img>
            </a>
        </div>
        <div className="col-lg-3">
            <a target="_blank" href="https://www.evgo.com/ev-drivers/how-to-charge-your-ev/">
                <img className="logo-box" src="./img/EVgo logo.jpg"></img>
            </a>
        </div>
        </div>
        <div className="row">
        <div className="col-lg-6">
            <a target="_blank" href="https://www.evconnect.com/driver-app">
                <img className="logo-box" src="./img/EVC_Logo-101-Standard-A.png"></img>
            </a>
        </div>
        <div className="col-lg-6">
            <a target="_blank" href="https://www.powerflex.com/powerflex-app/first-time-setup/">
                <img className="logo-box" src="./img/logo.svg"></img>
            </a>
        </div>
        </div>

        </React.Fragment>
    )
}