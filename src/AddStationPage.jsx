import React from "react";
import { useHistory } from "react-router-dom";
import "../static/styles.css"

export default function AddStationPage(props) {
  const token = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("user_id")

  const history = useHistory();
  const routeForm = (event) => {
    history.go(0);
  }

  // grab list of charging station levels
  const [levels, getEVLevels] = React.useState([]);
  const [inputs, setInputs] = React.useState({});

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


  React.useEffect(() => {
  fetch('/api/charging-level')
  .then((response) => response.json())
  .then((evChargingData) => {
      getEVLevels(evChargingData);
  })
  }, []);

  const chargingLevelOptions = levels.map((evChargingData) => evChargingData.charging_level).map(level => <option value={level}>{level}</option>)
  
    if (token){return (
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
                <p><label htmlFor="connection">Connection Type</label>
                  <input 
                    type="text" 
                    name="connection" 
                    value={inputs.connection} 
                    onChange={handleChange}
                    id="connection" required 
                  /> </p>
                  <p><label htmlFor="charging-level">Charging Station Level</label>
                  <select 
                        name="level" 
                        id="level" 
                        value={inputs.level}
                        onChange={handleChange}
                      >
                        <option defaultValue="Select a Level">
                          Select a Level
                        </option>
                  {chargingLevelOptions}
                  </select>
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
      <p><a href="/account"><button className="btn btn-outline-secondary" type="submit">Log In</button></a></p>
      </React.Fragment>
    )}
  }
