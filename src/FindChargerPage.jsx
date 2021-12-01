import React, { useState, useEffect } from "react";
import Map from "./Map"
import ChargingLevelDropdown from "./ChargingLevel";

export default function FindChargerPage(props) {

  const token = sessionStorage.getItem("token")
  const ev = sessionStorage.getItem("ev")

  const [evInfo, getEVInfo] = useState([]);
  
          useEffect(() => { 
            fetch(`api/profile/${ev}`)
            .then((response) => response.json())
            .then((evInfo) => {
              getEVInfo(evInfo);
            })
          }, [token]);
    
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    console.log(inputs)
  
    const [totalHours, setTotalHours] = useState([]);
  
    const calculateHours = (event) => {
      event.preventDefault();
      const range = parseInt(inputs.evRange)
  
      const miles = parseInt(inputs.currentMiles)
  
  
      if (inputs.level == 'Level 1'){
        const calc = ((range) - (miles))/5
        setTotalHours(calc.toFixed(2) + " hours");
      } else if (inputs.level == 'Level 2'){
        const calc = ((range) - (miles))/27
        setTotalHours(calc.toFixed(2) + " hours");
      } else if (inputs.level == 'Level 3'){
        const calc = ((range) - (miles))/80
        setTotalHours(calc.toFixed(2) + " hours");
      }
    }
    console.log(`totalHours: ${totalHours}`)

    
    if (!token) {
      return (
        <React.Fragment>
          <div className="row step-box">
          <div className="col-md-4">
            <h1>Step 1:</h1>
            <h1>Find Charger</h1>
            <ul>
              <li>Type your destination in the search bar</li>
              <li>Click on a pin to select the charger</li>
            </ul>
          </div>
            <div className="col-md-8">
              <Map />
            </div>
            </div>

            <div className="row step-box">
            <div className="col-md-4">
            <h1>Step 2:</h1>
            <h1>Calculate Charge Time</h1>
            <div className="selected-charger"></div>

          </div>
            <div className="col-md-8" id="calculator">
                <form id="calculator-form">
                <p>
                <ChargingLevelDropdown
                      onChange= {handleChange}
                      />
                  </p>
                  <p>
                      <label htmlFor="current-miles">Current Miles</label>
                      <input 
                        type="number" 
                        name="currentMiles" 
                        value={inputs.miles}
                        id="current-miles" 
                        onChange={handleChange}
                        required 
                      /> 
                  </p>
                  <p>
                      <label htmlFor="ev-range">Target Miles</label>
                      <input 
                        type="number" 
                        name="evRange"
                        value={inputs.range}
                        id="ev-range" 
                        onChange={handleChange}
                      /> 
                  </p>
                  <button type="submit" onClick={calculateHours}>Calculate</button>
                  <div>
                    <label htmlFor="calculation" >Charging Time:</label>
                    <div id="total-hours">{totalHours}</div>
                  </div>

                </form>
                <button onClick={() => (document.getElementById('step-three').scrollIntoView())}>Find Walkable Restaurants</button>

            </div>
          </div>

          <div className="row step-box" id="step-three">
          <div className="col-md-4" >
            <h1>Step 3:</h1>
            <h1>Find Walkable Restaurants</h1>
          </div>
                <div className="col-md-8 find-restaurant">
              
              </div>

          </div>

          <div className="row" id="overview">
            <h1>Overview</h1>
          </div>
          <div className="row step-box">
            <div className="col-md-4">
              <h3>Station</h3>
              <div id="station-details">
                </div>
              <div id="google-button">
                </div>
              </div>
            <div className="col-md-4">
            <h3>Charge Time</h3>
            <p>{totalHours}</p>
              </div>
            <div className="col-md-4">
              <h3>Restaurant Choice</h3>
              <div className="restaurant-choice" id="restaurant-choice">
              </div>
              </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="row step-box">
          <div className="col-md-4">
            <h1>Step 1:</h1>
            <h1>Find Charger</h1>
            <ul>
              <li>Type your destination in the search bar</li>
              <li>Click on a pin to select the charger</li>
            </ul>
          </div>
            <div className="col-md-8">
              <Map />
            </div>
            </div>


            <div className="row step-box">
            <div className="col-md-4">
            <h1>Step 2:</h1>
            <h1>Calculate Charge Time</h1>
            <p>Selected Charger Info</p>
            <div className="selected-charger"></div>
          </div>
                <div className="col-md-8" id="calculator">

                <form id="calculator-form">
                <p>Your EV: {evInfo.year} {evInfo.make} {evInfo.model}</p>
                <p>Range: {evInfo.range}</p>
                <p>
                    <ChargingLevelDropdown
                      // level= {inputs.chargingLevel}
                      onChange= {handleChange}
                      />
                </p>
                  <p>
                      <label htmlFor="current-miles">Current Miles</label>
                      <input 
                        type="number" 
                        name="currentMiles" 
                        value={inputs.miles}
                        id="current-miles" 
                        onChange={handleChange}
                        required 
                      /> 
                  </p>
                  <p>
                      <label htmlFor="ev-range">Target Miles</label>
                      <input 
                        type="number" 
                        name="evRange"
                        value={inputs.range}
                        // placeholder={evInfo.range}
                        id="ev-range" 
                        onChange={handleChange}
                      /> 
                  </p>
                  <button type="submit" onClick={calculateHours}>Calculate</button>
                  <div>
                    <label htmlFor="calculation" >Charging Time:</label>
                    <div id="total-hours">{totalHours}</div>
                  </div>

                </form>
                <button onClick={() => (document.getElementById('step-three').scrollIntoView())}>Find Walkable Restaurants</button>
            </div>
            </div>
            <div className="row step-box" id="step-three">
          <div className="col-md-4">
            <h1>Step 3:</h1>
            <h1>Find Walkable Restaurants</h1>
          </div>
          <div className="col-md-8 find-restaurant">
                
          </div>
          </div>

          <div className="row" id="overview">
            <h1>Overview</h1>
          </div>
          <div className="row step-box">
            <div className="col-md-4">
              <h3>Station</h3>
              <div id="station-details">
                </div>
              <div id="google-button">
                </div>
              </div>
            <div className="col-md-4">
            <h3>Charge Time</h3>
            <p>{totalHours}</p>
              </div>
              <div className="col-md-4">
              <h3>Restaurant Choice</h3>
              <div className="restaurant-choice" id="restaurant-choice">
              </div>
              </div>
          </div>
          
        </React.Fragment>)
    }
    
    };