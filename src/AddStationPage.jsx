import React from "react";


export default function AddStationPage(props) {
  const token = sessionStorage.getItem("token")

  
    if (token){return (
        <React.Fragment>
          <h1>Add Station</h1>
          <div id="add-station-form">
            <form action="/api/add-station" method="post" id="add-station">
                <label htmlFor="station-name">Station Name</label>
                  <input 
                    type="text" 
                    name="station-name" 
                    // value={inputs.stationName} 
                    // onChange={handleChange}
                    id="station-name" required 
                  />
                <label htmlFor="street-address">Street Address</label>
                  <input 
                    type="text" 
                    name="street-address" 
                    // value={inputs.streetAddress} 
                    // onChange={handleChange}
                    id="street-address" required 
                  />
                <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    name="city" 
                    // value={inputs.city} 
                    // onChange={handleChange}
                    id="city" required 
                  /> 
                <label htmlFor="state">State</label>
                  <input 
                    type="text" 
                    name="state" 
                    // value={inputs.state} 
                    // onChange={handleChange}
                    id="state" required 
                  /> 
                 <label htmlFor="zip">Zip Code</label>
                  <input 
                    type="text" 
                    name="zip" 
                    // value={inputs.zip} 
                    // onChange={handleChange}
                    id="zip" required 
                  /> 
                <label htmlFor="connection">Connection Type</label>
                  <input 
                    type="text" 
                    name="connection" 
                    // value={inputs.connection} 
                    // onChange={handleChange}
                    id="connection" required 
                  /> 
                  <label htmlFor="access">Access</label>
                  <input 
                    type="text" 
                    name="access" 
                    // value={inputs.access} 
                    // onChange={handleChange}
                    id="access" required 
                  /> 

          <p><button className="btn btn-outline-secondary" type="submit">Submit</button></p>

            </form>
          </div>
        </React.Fragment>
    )} else { return (
      <React.Fragment>
      <h1>Add Station</h1>
      <div>You must be logged in to add a station. Click below to log in or create an account.</div>
      <p><a href="/account"><button className="btn btn-outline-secondary" type="submit">Submit</button></a></p>
      </React.Fragment>
    )}
  }
