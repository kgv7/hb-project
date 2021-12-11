import React, { useState }from "react";
import { useHistory, Link } from "react-router-dom";
import "../static/form-styles.css";
import ChargingLevelDropdown from "./ChargingLevel";
import BackgroundPhoto from "./img/station-background.jpg";



export default function AddStationPage(props) {

  const history = useHistory();
  const [inputs, setInputs] = useState({});

  const token = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("user_id")

  const routeForm = (event) => {
    history.push('/profile');
    // alert("Thanks for adding a station!")
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try{
      const resp = await fetch(`/api/create-station-${userId}`, {
          method: 'POST',
          headers: {"Accept": "application/json",
                    "Content-Type":"application/json"},
          body: JSON.stringify(inputs),
          })
      if (resp.status !== 200) {
          alert("There has been an error");
          return false;
      }
      const data = await resp.json();
      // alert("Thank you for adding a station!")
      console.log("this has come from backend", data);

      if (data) {
        routeForm(event)
      }

      return data;
    }
    catch(error){
      console.error("THERE WAS AN ERROR!!!", error)
    };
  };

  
    if (token){
      return (
        <React.Fragment>
          {/* <h1>Add Station</h1> */}
        <div className="account-div" style={{backgroundImage: `url(${BackgroundPhoto})`}}>

          <div className="account-container">
                <div className="account-top-container">
                    <div className="account-backdrop" />
                      <div className="account-header-text"> Add Station</div>
                      <div className="account-small-text"> {props.instruction} </div>
                </div>
          <div className="account-inner-container" id="add-station-form">
            <form action="/api/add-station" method="post" id="add-station" onSubmit={handleSubmit}>
                <p>
                <label htmlFor="station-name">Station Name</label>
                  <input 
                    type="text" 
                    name="station-name" 
                    value={inputs.stationName} 
                    onChange={handleChange}
                    id="station-name"
                    className="form-control" required 
                  /></p>
                <p><label htmlFor="street">Street Address</label>
                  <input 
                    type="text" 
                    name="street" 
                    value={inputs.streetAddress} 
                    onChange={handleChange}
                    id="street"
                    className="form-control" required 
                  /></p>
                <p><label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={inputs.city} 
                    onChange={handleChange}
                    id="city"
                    className="form-control" required 
                  /> </p>
                <p><label htmlFor="state">State</label>
                  <input 
                    type="text" 
                    name="state" 
                    value={inputs.state} 
                    onChange={handleChange}
                    id="state"
                    className="form-control" required 
                  /> </p>
                 <p><label htmlFor="zip">Zip Code</label>
                  <input 
                    type="text" 
                    name="zip" 
                    value={inputs.zip} 
                    onChange={handleChange}
                    id="zip"
                    className="form-control" required 
                  /> </p>
                <p><label htmlFor="connection">Connection Type</label>
                  <select 
                    name="connection" 
                    id="connection" 
                    value={inputs.connection} 
                    onChange={handleChange}
                    className="form-select" required
                  >
                    <option defaultValue="Select a Connection">
                        Select a Connection Type
                    </option>
                    <option key="Tesla" value="Tesla">Tesla</option>
                    <option key="J1772" value="J1772">J1772 or J Charger</option>
                    <option key="DC" value="DC">DC Charger</option>
                  </select></p>
                  <p>
                    <ChargingLevelDropdown
                      level={inputs.level}
                      onChange={handleChange}
                      
                      />
                  </p>
                  <p>Not sure which level? <a target="_blank" href="/about-charging">Click here to learn more.</a></p>
                  <p><label htmlFor="num-chargers">Number of Chargers</label>
                  <input 
                    type="number" 
                    name="num-chargers" 
                    value={inputs.numChargers} 
                    onChange={handleChange}
                    className="form-control"
                    id="num-chargers"  
                  /></p>
                  <div><label htmlFor="access">Access</label>
                  <div className="radio-btns">
                  <p><input type="radio" id="access" name="access" value="public" onChange={handleChange} required />
                    <label htmlFor="public">Public</label></p>
                  <p><input type="radio" id="access" name="access" value="private" onChange={handleChange} required />
                    <label htmlFor="private">Private</label></p>
                    </div>
                  </div>
                  <p><label htmlFor="cost">Cost per kWh</label>
                  <input 
                    type="number" 
                    name="cost" 
                    value={inputs.cost} 
                    onChange={handleChange}
                    className="form-control"
                    id="cost"  
                  /> </p>
                  <p><label htmlFor="payment-type">Payment Type</label>
                   <select 
                    name="payment" 
                    id="payment" 
                    value={inputs.payment} 
                    onChange={handleChange}
                    className="form-select" required
                  >
                    <option defaultValue="Select Accepted Payment">
                      Select Accepted Payment
                    </option>
                    <option key="credit" value="credit">Credit</option>
                    <option key="app-pay" value="app-pay">Venmo</option>
                    <option key="app" value="app">Charger Station App</option>
                  </select>
                  </p>

          <p><button className="btn btn-outline-secondary" type="submit">Submit</button></p>

            </form>
            </div>
          </div>
          </div>
        </React.Fragment>
    )} else { return (
      <React.Fragment>
        {/* <div className="add-station-container" style={{backgroundImage: `url(${BackgroundPhoto})`}}> */}
        <div className="account-div" style={{backgroundImage: `url(${BackgroundPhoto})`}}>
        <div className="account-container">
                <div className="account-top-container">
                    <div className="account-backdrop" />
                      <div className="account-header-text"> Add Station</div>
                </div>
          <div>
              <div className="account-inner-container" style={{textAlign:"center"}}><h5><strong>You must be logged in to add a station.</strong></h5>
              <p><Link to="/account"><button className="btn btn-outline-secondary" type="submit">Log In</button></Link></p>
            </div>
            </div>
       </div>
          </div>
      </React.Fragment>
    )}
  }