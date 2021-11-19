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
          });
      }, [lonLatData]);


    const restaurantOptions = restaurantList.map(restaurant => <div>
                                                                    <div value="restaurant-name">
                                                                        <a href={restaurant.restaurant_website}>
                                                                        {restaurant.restaurant_name}
                                                                    </a></div>
                                                                    <div value="restaurant-details">
                                                                        {restaurant.address.street}, {restaurant.address.city}, 
                                                                        {restaurant.address.state} {restaurant.address.zip}
                                                                    </div>
                                                                    </div>)
    ReactDOM.render(restaurantOptions, document.querySelector("#find-restaurant"))


    return (
            <div>
            <button 
                onClick={getLatLong}
                value={[props.lat, props.lng]}
            >
                Find Walkable Restaurants
            </button>
            </div>  

    )
}


