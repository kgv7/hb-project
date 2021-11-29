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


    const restaurantOptions = restaurantList.map(restaurant => <div>
                                                                    <input type="radio" name="restaurant-list" value={restaurant.restaurant_id} />
                                                                    <label htmlFor={restaurant.restaurant_id}>
                                                                      {restaurant.restaurant_name}</label>
                                                                        <p>{restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state} {restaurant.address.postal_code}</p>
                                                                        <p>{restaurant.hours}</p>
                                                                        <p><a href={restaurant.restaurant_website}>{restaurant.restaurant_website}</a></p>
                                                                    </div>)
    
    const [pickRestaurant, getRestaurantChoice] = useState("")

    const handleSubmit = (event) => {
      event.preventDefault()
      // const restaurant = event.target.value;
      // console.log(event)
      console.log("hi")
      // getRestaurantChoice(restaurant)
      // document.getElementById('overview').scrollIntoView()
    };
    
    const restaurantForm = (<div>
                              {restaurantOptions}
                              <button className="submit" onSubmit={handleSubmit}>Select Restaurant</button>
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
        <strong>{props.addr}, </strong>
        <strong>{props.city}, {props.state} {props.zip}</strong>
    </div>)
    
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


