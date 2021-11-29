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
                                                                    <div value="restaurant-name">
                                                                        {restaurant.restaurant_name}
                                                                  </div>
                                                                    <div value="restaurant-details">
                                                                        {restaurant.address.street}, {restaurant.address.city}, 
                                                                        {restaurant.address.state} {restaurant.address.zip}
                                                                    </div>
                                                                    </div>)
    ReactDOM.render(restaurantOptions, document.querySelector(".find-restaurant"))

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


