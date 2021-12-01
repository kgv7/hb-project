import React, { useState, useEffect } from "react";
// import {
//   InfoWindow,
// } from "@react-google-maps/api";
// import Loading from "./Loading";

export default function InfoBoxButton (props) {

    // get coordinates from button value
    const [lonLatData, getCoordinates] = useState([])
    
    const getLatLong = (event) => {
        const coordinates = props.event
        console.log(coordinates.longitude)
        getCoordinates([coordinates.latitude, coordinates.longitude])
    }

    // use coordinates from button to pass through to API
    // and populate a list of restaurants
    const [restaurantList, getRestaurant] = useState([])

    const latitude = (lonLatData[0])
    const longitude = (lonLatData[1])
    console.log(`long: ${longitude}`)

    
      useEffect(() => {
        fetch(`/api/restaurants-${latitude}&${longitude}`, {
            method: 'GET',
            headers: {"Content-Type":"application/json"},
            })
          .then((response) => response.json())
          .then((restaurantData) => {
            console.log(`passed from backend data: ${restaurantData}`)
            getRestaurant(restaurantData)
            // getDirections()
            document.getElementById('calculator').scrollIntoView()
          });
      }, [lonLatData]);

    // pick restaurant from list and have it show on overview

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
      // const name = event.target.name;
      const value = event.target.value;
      // console.log(name)
      console.log(value)
      setInputs([value])
    }

    // show list of restaurants
    const restaurantOptions = restaurantList.map(restaurant => <div>
                                                                    <input 
                                                                      type="radio" 
                                                                      name="restaurant-list" 
                                                                      key={restaurant.restaurant_id} 
                                                                      value={restaurant.restaurant_name} 
                                                                      onChange={handleChange}/>
                                                                        <label htmlFor={restaurant.restaurant_id}>
                                                                          {restaurant.restaurant_name}
                                                                        </label>
                                                                          <p>{restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state} {restaurant.address.postal_code}</p>
                                                                          <p>{restaurant.hours}</p>
                                                                          <p><a href={restaurant.restaurant_website}>{restaurant.restaurant_website}</a></p>
                                                                </div>)
    
    const [pickRestaurant, getRestaurantChoice] = useState([])

    const handleSubmit = (event) => {
      event.preventDefault()
      getRestaurantChoice(inputs)
      document.getElementById('overview').scrollIntoView()
    };
    
    const restaurantForm = (<div>
                              <form>
                                {restaurantOptions}
                                <button className="submit" onClick={handleSubmit}>Select Restaurant</button>
                              </form>
                            </div>)

    ReactDOM.render(restaurantForm, document.querySelector(".find-restaurant"))
    ReactDOM.render(pickRestaurant, document.querySelector(".restaurant-choice"))

    // get Directions button
    
    const googleURL = `https://www.google.com/maps/dir/?api=1&destination=${props.addr}&2C${props.city}`

    const getDirections = (
      <div>
        <a target="_blank" href={googleURL}>
        <button
          onClick={getLatLong}
          value={[props.lat, props.lng]}
        >
          Get Directions
        </button></a>
    </div>)

    ReactDOM.render(getDirections, document.querySelector("#google-button"))

    // get Station Details on FindChargerPage Overview section
    
    
    
    const stationDetails = (<div>
        <h5>{props.name}</h5>
        <strong>{props.addr}, {props.city}, {props.state} {props.zip}</strong>
        <p># of Level 1 Chargers: {props.level1}</p>
        <p># of Level 2 Chargers: {props.level2}</p>
        <p># of Level 3 Chargers: {props.level3}</p>

    </div>)
    
    ReactDOM.render(stationDetails, document.querySelector('.selected-charger'))
    ReactDOM.render(stationDetails, document.querySelector('#station-details'))

    return (
            <div>
            <div>
            <button 
                onClick={getLatLong}
                value={[props.lat, props.lng]}
            >
              Select Charger            
              </button>
            </div>  
            
            </div>

    )
}


