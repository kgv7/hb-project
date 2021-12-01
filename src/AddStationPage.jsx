import React, { useState }from "react";
import { useHistory, Link } from "react-router-dom";
import "../static/styles.css"
import ChargingLevelDropdown from "./ChargingLevel";


export default function AddStationPage(props) {

  const history = useHistory();
  const [inputs, setInputs] = useState({});

  const token = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("user_id")

  const routeForm = (event) => {
    history.push('/profile');
    alert("Thanks for adding a station!")
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
      alert("Thank you for adding a station!")
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
          <h1>Add Station</h1>
          <div id="add-station-form">
            <form action="/api/add-station" method="post" id="add-station" onSubmit={handleSubmit}>
                <p>
                <label htmlFor="station-name">Station Name</label>
                  <input 
                    type="text" 
                    name="station-name" 
                    value={inputs.stationName} 
                    onChange={handleChange}
                    id="station-name" required 
                  /></p>
                <p><label htmlFor="street">Street Address</label>
                  <input 
                    type="text" 
                    name="street" 
                    value={inputs.streetAddress} 
                    onChange={handleChange}
                    id="street" required 
                  /></p>
                <p><label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={inputs.city} 
                    onChange={handleChange}
                    id="city" required 
                  /> </p>
                <p><label htmlFor="state">State</label>
                  <input 
                    type="text" 
                    name="state" 
                    value={inputs.state} 
                    onChange={handleChange}
                    id="state" required 
                  /> </p>
                 <p><label htmlFor="zip">Zip Code</label>
                  <input 
                    type="text" 
                    name="zip" 
                    value={inputs.zip} 
                    onChange={handleChange}
                    id="zip" required 
                  /> </p>
                <p><label htmlFor="connection">Connection Type</label></p>
                  {/* <input 
                    type="text" 
                    name="connection" 
                    value={inputs.connection} 
                    onChange={handleChange}
                    id="connection" required 
                  /> </p> */}
                  <select 
                    name="connection" 
                    id="connection" 
                    value={inputs.connection} 
                    onChange={handleChange} required
                  >
                    <option defaultValue="Select a Connection">
                        Select a Level
                    </option>
                    <option key="Tesla" value="Tesla">Tesla</option>
                    <option key="J1772" value="J1772">J1772 or J Charger</option>
                    <option key="DC" value="DC">DC Charger</option>
                  </select>
                  <p>
                    <ChargingLevelDropdown
                      level={inputs.level}
                      onChange={handleChange}
                      />
                  </p>
                  <p>Not sure which level? Click here to learn more.</p>
                  <p><label htmlFor="access">Access</label>
                  <input type="radio" id="access" name="access" value="public" onChange={handleChange} required />
                    <label htmlFor="public">Public</label>
                  <input type="radio" id="access" name="access" value="private" onChange={handleChange} required />
                    <label htmlFor="private">Private</label>
                  </p>
                  <p><label htmlFor="cost">Cost</label>
                  <input 
                    type="text" 
                    name="cost" 
                    value={inputs.cost} 
                    onChange={handleChange}
                    id="cost"  
                  /> per kWh</p>
                  <p><label htmlFor="payment-type">Payment Type</label>
                  <input 
                    type="text" 
                    name="payment" 
                    value={inputs.payment} 
                    onChange={handleChange}
                    id="payment"  
                  /> </p>

          <p><button className="btn btn-outline-secondary" type="submit">Submit</button></p>

            </form>
          </div>
        </React.Fragment>
    )} else { return (
      <React.Fragment>
      <h1>Add Station</h1>
      <div>You must be logged in to add a station. Click below to log in or create an account.</div>
      <p><Link to="/account"><button className="btn btn-outline-secondary" type="submit">Log In</button></Link></p>
      </React.Fragment>
    )}
  }