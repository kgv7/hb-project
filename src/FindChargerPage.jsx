import React, { useState, useEffect } from "react";
import Map from "./Map"
import ChargingLevelDropdown from "./ChargingLevel";
import "../static/find-charger-styles.css";
import BackgroundPhoto from "./img/recharge-form-background.jpg";



export default function FindChargerPage(props) {

  const token = sessionStorage.getItem("token")
  const ev = sessionStorage.getItem("ev")
  const userID = sessionStorage.getItem("user_id")



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
          setTotalHours(calc.toFixed(2) + " hours")}
      else if (inputs.level == 'Level 2'){
          const calc = ((range) - (miles))/27
          setTotalHours(calc.toFixed(2) + " hours")}
      else if (inputs.level == 'Level 3'){
            const calc = ((range) - (miles))/80
            setTotalHours(calc.toFixed(2) + " hours")
      }
    }
      
  
      // if (inputs.level == 'Level 1'){
      //   const calc = ((range) - (miles))/5
      //   const calculatedHours = calc.toFixed(2) + " hours"
      //   setTotalHours(<div><p className="calculated-time">
      //   <p>Charge Time:</p>
      //     <p className="hours" id="hours">{calculatedHours}</p></p>
      //     <p className="d-grid gap-2">
      //       <button className="btn btn-outline-secondary" onClick={(event) => {event.preventDefault(); document.getElementById('step-three').scrollIntoView()}}>
      //         Find Walkable Restaurants
      //       </button></p></div>)
      // } else if (inputs.level == 'Level 2'){
      //   const calc = ((range) - (miles))/27
      //   const calculatedHours = calc.toFixed(2) + " hours"
      //   setTotalHours(<div><p className="calculated-time">
      //   <p>Charge Time:</p>
      //     <p className="hours" id="hours">{calculatedHours}</p></p>
      //     <p className="d-grid gap-2">
      //       <button className="btn btn-outline-secondary" onClick={() => {event.preventDefault(); document.getElementById('step-three').scrollIntoView()}}>
      //         Find Walkable Restaurants
      //       </button></p></div>)
      // } else if (inputs.level == 'Level 3'){
      //   const calc = ((range) - (miles))/80
      //   const calculatedHours = calc.toFixed(2) + " hours"
      //   setTotalHours(<div><p className="calculated-time">
      //   <p>Charge Time:</p>
      //     <p className="hours" id="hours">{calculatedHours}</p></p>
      //     <p className="d-grid gap-2">
      //       <button className="btn btn-outline-secondary" onClick={() => {event.preventDefault(); document.getElementById('step-three').scrollIntoView()}}>
      //         Find Walkable Restaurants
      //       </button></p></div>)
      // }

    // console.log(`totalHours: ${totalHours}`)

    
    if (!token) {
      return (
        <React.Fragment>
          <div className="find-charger-container">
          <div className="row step-box step-box-grey">
          <div className="col-md-4 step-head" id="step-one">
            <h1>Step 1:</h1>
            <h1>Find Charger</h1>
            <div><h3>Search</h3> </div>

            <div><h3>Select</h3></div>
            <div className="search-box-container"> </div>
          </div>
            <div className="col-md-8 p-0" id="map">
              <Map />
            </div>
            </div>

            <div className="row step-box" id="step-two">
            <div className="col-md-4 step-head">

            <h1>Step 2:</h1>
            <h1>Calculate Charge Time</h1>
          
            <div className="selected-charger"></div>
            </div>


          <div className="col-md-8" id="calculator">
          <div className="calculator-container">
            <div className="calculator-inner-container">

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
                        className="form-control"
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
                        className="form-control"
                        onChange={handleChange}
                      /> 
                  </p>
                  <div className="d-grid gap-2 col-6 mx-auto pt-5"><button className="btn btn-outline-secondary" type="submit" onClick={calculateHours}>Calculate</button>
                  </div><div>
                    {/* <label htmlFor="calculation" >Charging Time:</label> */}
                    {/* <div id="total-hours"></div> */}
                    <div> <div className="calculated-time">
                          <p>Charge Time:</p>
                          <p className="hours" id="hours">{totalHours}</p></div>
                            <p className="d-grid gap-2">
                            <button className="btn btn-outline-secondary" onClick={(event) => {event.preventDefault(); document.getElementById('step-three').scrollIntoView()}}>
                            Find Walkable Restaurants
                            </button></p></div>
                  </div>

                </form>
            </div>
            </div>
            </div>
          </div>


          <div className="row step-box step-box-grey" id="step-three">
          <div className="col-md-4 step-head" >
            <h1>Step 3:</h1>
            <h1>Find Walkable Restaurants</h1>
            <h3>5 to 10 Minute Walking Distance</h3>
          </div>
                <div className="col-md-8 find-restaurant">
              
              </div>

          </div>
          
          <div id="overview-header" style={{backgroundImage: `url(${BackgroundPhoto})`}}>
          <div className="row">
          <h1>Time to Recharge</h1>
          </div>
          
          <div className="overview-container">

          <div className="row" id="overview-details">

            <div className="col-md-4">
              <h3>Station</h3>
              <div id="station-details">
                </div>
              <div id="google-button">
                </div>
              </div>
            <div className="col-md-4">
            <h3>Charge Time</h3>
            <div className="hours" id="charge-time" value={totalHours}>{totalHours}</div>
              </div>
            <div className="col-md-4">
              <h3>Restaurant Choice</h3>
              <div className="restaurant-choice" id="restaurant-choice">
              </div>
              </div>
          </div>
          </div>
          </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
        <div className="find-charger-container">
        <div className="row step-box step-box-grey">
        <div className="col-md-4 step-head" id="step-one">
          <h1>Step 1:</h1>
          <h1>Find Charger</h1>
          <h3>Search and Select</h3>
          <div className="search-box-container"> </div>
        </div>
          <div className="col-md-8 p-0" id="map">
            <Map />
          </div>
          </div>

          <div className="row step-box" id="step-two">
          <div className="col-md-4 step-head">

          <h1>Step 2:</h1>
          <h1>Calculate Charge Time</h1>
        
          <div className="selected-charger"></div>
          </div>


        <div className="col-md-8" id="calculator">
        <div className="calculator-container">
          <div className="calculator-inner-container">

              <form id="calculator-form">
              <p>Your EV: {evInfo.year} {evInfo.make} {evInfo.model}</p>
              <p>Range: {evInfo.range}</p>
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
                      className="form-control"
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
                      className="form-control"
                      onChange={handleChange}
                    /> 
                </p>
                <div className="d-grid gap-2 col-6 mx-auto pt-5"><button className="btn btn-outline-secondary" type="submit" onClick={calculateHours}>Calculate</button>
                </div><div>
                  {/* <label htmlFor="calculation" >Charging Time:</label> */}
                  {/* <div id="total-hours">{totalHours}</div> */}
                  <div><div className="calculated-time">
                          <p>Charge Time:</p>
                          <p className="hours" id="hours">{totalHours}</p></div>
                            <p className="d-grid gap-2">
                            <button className="btn btn-outline-secondary" onClick={(event) => {event.preventDefault(); document.getElementById('step-three').scrollIntoView()}}>
                            Find Walkable Restaurants
                            </button></p></div>
                </div>

              </form>
          </div>
          </div>
          </div>
        </div>


        <div className="row step-box step-box-grey" id="step-three">
        <div className="col-md-4 step-head" >
          <h1>Step 3:</h1>
          <h1>Find Walkable Restaurants</h1>
          <h3>5 to 10 Minute Walking Distance</h3>
        </div>
              <div className="col-md-8 find-restaurant">
            
            </div>

        </div>
        
        <div id="overview-header" style={{backgroundImage: `url(${BackgroundPhoto})`}}>
        <div className="row">
        <h1>Time to Recharge</h1>
        </div>
        
        <div className="overview-container">

        <div className="row" id="overview-details">

          <div className="col-md-4">
            <h3>Station</h3>
            <div id="station-details">
              </div>
            <div id="google-button">
              </div>
            </div>
          <div className="col-md-4">
          <h3>Charge Time</h3>
          <div id="charge-time" value={totalHours}>{totalHours}</div>
            </div>
          <div className="col-md-4">
            <h3>Restaurant Choice</h3>
            <div className="restaurant-choice" id="restaurant-choice">
            </div>

            </div>
            <div className="row save-itinerary-button">
          </div>
        </div>

        </div>
        </div>
        </div>
      </React.Fragment>)
    }
    
    };




