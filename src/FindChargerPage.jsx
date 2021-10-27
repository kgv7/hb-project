import React, { useState, useEffect } from "react";
import Map from "./Map"

export default function FindChargerPage(props) {

    
    // grab list of charging station levels
    const [levels, getEVLevels] = React.useState([]);
  
    React.useEffect(() => {
    fetch('/api/charging-level')
    .then((response) => response.json())
    .then((evChargingData) => {
        getEVLevels(evChargingData);
    })
    }, []);
  
    const chargingLevelOptions = levels.map((evChargingData) => evChargingData.charging_level).map(level => <option value={level}>{level}</option>)
    
    const [inputs, setInputs] = React.useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    console.log(inputs)
  
    const [totalHours, setTotalHours] = React.useState([]);
  
    const calculateHours = (event) => {
      event.preventDefault();
      const range = parseInt(inputs.evRange)
  
      const miles = parseInt(inputs.currentMiles)
  
  
      if (inputs.chargingLevel == 'Level 1'){
        setTotalHours(((range * .8) - (miles))/5);
      } else if (inputs.chargingLevel == 'Level 2'){
        setTotalHours(((range * .8) - (miles))/20);
      } else if (inputs.chargingLevel == 'Level 3'){
        setTotalHours(((range * .8) - (miles))/80);
      }
    }
    console.log(`totalHours: ${totalHours}`)
    

    return (
          <React.Fragment>
            <div className="row">
              <div className="col-md-8" id="map">
              <h1>Find Charger</h1>
                <Map />
              </div>
              <div className="col-md-4" id="calculator">
                  <h3>Calculate Charge Time:</h3>
                  <p>Based on your EV: 2019 Tesla Model S Standard Range</p>
                  <form id="calculator-form">
                  <p>
                    <label htmlFor="charging-level">Charging Station Level</label>
                    
                    <select 
                          name="chargingLevel" 
                          id="charging-level" 
                          value={inputs.level}
                          onChange={handleChange}
                        >
                          <option defaultValue="Select a Level">
                            Select a Level
                          </option>
                    {chargingLevelOptions}
                    </select>
                    </p>
                    <p>
                        <label htmlFor="current-miles">Current Miles</label>
                        <input 
                          type="text" 
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
                          type="text" 
                          name="evRange"
                          value={inputs.range}
                          placeholder="285"
                          id="ev-range" 
                          onChange={handleChange}
                        /> 
                    </p>
                    <button type="submit" onClick={calculateHours}>Calculate</button>
                    <div>
                      <label htmlFor="calculation" >Minutes for 80% Charge:</label>
                      <div id="total-hours">{totalHours} hours</div>
                      <p>(80% is the recommended limit for rapid charging)</p>
                    </div>
  
                  </form>
  
              </div>
            </div>
          </React.Fragment>
        );
    };