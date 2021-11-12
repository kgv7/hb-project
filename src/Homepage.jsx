import React from "react";
import Loadingimage from "./img/lightningbolt.png";


export default function Homepage(props) {
    return (
      <div id="home-banner" className="row">
        <div className="col-md-6">
          <h1>Recharge</h1>
          <p className="lead">Tagline</p>
        </div>
        <div className="col">
        <div className="card-deck">
            <div className="card">
              <img className="card-img-top" src={Loadingimage} alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">Find a Charger</h5>
                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
            <div className="card">
              <img className="card-img-top" src={Loadingimage} alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">Learn About EV Charging</h5>
                <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
          </div>
        </div>
    );
  }