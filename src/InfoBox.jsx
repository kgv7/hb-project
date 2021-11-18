import React, { useState, useEffect } from "react";
// import {
//   InfoWindow,
// } from "@react-google-maps/api";
// import Loading from "./Loading";

export default function InfoBoxButton (props) {

    const [lonLatData, getRestaurant] = useState([])
    
    const getLatLong = (event) => {
        const coordinates = props.event
        console.log(coordinates.longitude)
        getRestaurant([coordinates.latitude, coordinates.longitude])
    }

    const lat = 34.04605713
    const lon = -118.2339751
    
      useEffect(() => {
        fetch(`/api/restaurant?lat=${lat}?lon=${lon}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          });
      }, [lonLatData]);
    

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
