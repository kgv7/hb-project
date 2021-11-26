import React, { useState, useEffect } from "react";
import Map from "./Map"
import ChargingLevelDropdown from "./ChargingLevel";

export default function FindChargerPage(props) {

  const token = sessionStorage.getItem("token")
  const ev = sessionStorage.getItem("ev")

  const [evInfo, getEVInfo] = React.useState([]);
  
          React.useEffect(() => { 
            fetch(`api/profile/${ev}`)
            .then((response) => response.json())
            .then((evInfo) => {
              getEVInfo(evInfo);
            })
          }, [token]);

    // grab list of charging station levels
    // const [levels, getEVLevels] = React.useState([]);
  
    // React.useEffect(() => {
    // fetch('/api/charging-level')
    // .then((response) => response.json())
    // .then((evChargingData) => {
    //     getEVLevels(evChargingData);
    // })
    // }, []);
  
    // const chargingLevelOptions = levels.map((evChargingData) => evChargingData.charging_level).map(level => <option key={level} value={level}>{level}</option>)
    
    const [inputs, setInputs] = React.useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    // console.log(inputs)
  
    const [totalHours, setTotalHours] = React.useState([]);
  
    const calculateHours = (event) => {
      event.preventDefault();
      const range = parseInt(inputs.evRange)
  
      const miles = parseInt(inputs.currentMiles)
  
  
      if (inputs.chargingLevel == 'Level 1'){
        const calc = ((range) - (miles))/5
        setTotalHours(calc.toFixed(2));
      } else if (inputs.chargingLevel == 'Level 2'){
        const calc = ((range) - (miles))/27
        setTotalHours(calc.toFixed(2));
      } else if (inputs.chargingLevel == 'Level 3'){
        const calc = ((range) - (miles))/80
        setTotalHours(calc.toFixed(2));
      }
    }
    // console.log(`totalHours: ${totalHours}`)
    
    if (!token) {
      return (
        <React.Fragment>
          <div className="row">
            <h1>Find Charger</h1>
          </div>
          <div className="row">
            <div className="col-md-8">
              <Map />
            </div>
            <div className="col-md-4" id="calculator">
                <h3>Calculate Charge Time:</h3>
                <form id="calculator-form">
                <p>
                <ChargingLevelDropdown
                      level= {inputs.level}
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
                    <div id="total-hours">{totalHours} hours</div>
                  </div>

                </form>

            </div>
          </div>
          <div className="row">
          <div><h3>Walkable Restaurants</h3></div>
              <div className="find-restaurant"></div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-8">
            <h1>Find Charger</h1>
              <Map />
            </div>
            <div className="col-md-4" id="calculator">
                <h3>Calculate Charge Time:</h3>
                <p>Based on your EV: {evInfo.year} {evInfo.make} {evInfo.model}</p>
                <form id="calculator-form">
                <p>
                    <ChargingLevelDropdown
                      // level=
                      // onChange=
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
                      <label htmlFor="ev-range">Your EV's Range</label>
                      <input 
                        type="number" 
                        name="evRange"
                        value={inputs.range}
                        placeholder={evInfo.range}
                        id="ev-range" 
                        onChange={handleChange}
                      /> 
                  </p>
                  <button type="submit" onClick={calculateHours}>Calculate</button>
                  <div>
                    <label htmlFor="calculation" >Charging Time:</label>
                    <div id="total-hours">{totalHours} hours</div>
                  </div>

                </form>

            </div>
            <div className="row">
            <div className="col-md-4">
            <div><h3>Walkable Restaurants</h3></div>
              <div className="find-restaurant"></div>
       
          </div>
          </div>
          </div>
        </React.Fragment>)
    }
    
    };