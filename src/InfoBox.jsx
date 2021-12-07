import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// import {
//   InfoWindow,
// } from "@react-google-maps/api";
// import Loading from "./Loading";

export default function InfoBoxButton (props) {

  const userID = sessionStorage.getItem("user_id")
  const history = useHistory();
  const routeForm = (event) => {
    history.push("/profile"); 
  }
  const token = sessionStorage.getItem("token")


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
            document.getElementById('step-two').scrollIntoView()
          });
      }, [lonLatData]);

    // pick restaurant from list and have it show on overview

    const [restaurantID, setInputs] = useState([]);

    const handleChange = (event) => {
      // const name = event.target.name;
      const value = event.target.value;
      // console.log(name)
      // console.log(value)
      setInputs([value])
    }

    // show list of restaurants
    const restaurantOptions = restaurantList.map(restaurant => <div>
                                                                    <input 
                                                                      type="radio" 
                                                                      name="restaurant-list" 
                                                                      key={restaurant.restaurant_id} 
                                                                      value={restaurant.restaurant_id} 
                                                                      onChange={handleChange}/>
                                                                        <label className="restaurant-map" htmlFor={restaurant.restaurant_id}>
                                                                          {restaurant.restaurant_name}
                                                                        </label>
                                                                        <div className="restaurant-details">
                                                                          <p>{restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state} {restaurant.address.postal_code}</p>
                                                                          <p>{restaurant.hours}</p>
                                                                        </div>
                                                                          {/* <p><a href={restaurant.restaurant_website}>{restaurant.restaurant_website}</a></p> */}
                                                                </div>)
    
        
    const [pickRestaurant, getRestaurantChoice] = useState({})

    useEffect(() => {
      fetch(`/api/rest-${restaurantID}`, {
        method: 'GET',
        headers: {"Content-Type":"application/json"},
      })
      .then((response) => response.json())
      .then((restaurantAPIDetails) => {
        // console.log(restaurantAPIDetails)
        getRestaurantChoice(restaurantAPIDetails)
      });
      // if (pickRestaurant){
        
    }, [restaurantID]);



    const handleSubmit = async event => {
      event.preventDefault()
      await pickRestaurant
      console.log(pickRestaurant.address.formatted);
      
      if (pickRestaurant){
      const showSelectedRestaurant = (
        <div>
          <div id="rest-name" value={pickRestaurant.restaurant_name}>Name: {pickRestaurant.restaurant_name}</div>
          <div id="rest-address" value={pickRestaurant.address.formatted}>Address: {pickRestaurant.address.formatted}</div>
          <div id="rest-phone" value={pickRestaurant.restaurant_phone}>Phone: {pickRestaurant.restaurant_phone}</div>
        </div>
      )

      ReactDOM.render(showSelectedRestaurant, document.querySelector(".restaurant-choice"));
      document.getElementById('#overview').scrollIntoView();
      }
      };
    
    const restaurantForm = (
                              <form action="/api/rest-${restaurantID}" method="get" onSubmit={handleSubmit}>
                                {restaurantOptions}
                                <p className="d-grid gap-2">
                                  <button className="btn btn-outline-secondary submit">
                                    Select Restaurant</button></p>
                              </form>
                            )



    ReactDOM.render(restaurantForm, document.querySelector(".find-restaurant"))

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

    // get charge time to add to itinerary
    if(token){
      const chargeTime = document.querySelector("#charge-time").getAttribute("value")
      // save Itinerary
      
      const saveItinerary = async event => {
        event.preventDefault();
        const itinerary_inputs = {
          "station-name": `${props.name}`,
          "street": `${props.addr}`,
          "city": `${props.city}`,
          "state": `${props.state}`,
          "zip": `${props.zip}`,
          "level1":`${props.level1}`,
          "level2":`${props.level2}`,
          "level3":`${props.level3}`,
          "charge_time": `${chargeTime}`,
          "restaurant-name": `${pickRestaurant.restaurant_name}`,
          "restaurant_street": `${pickRestaurant.address.street}`,
          "restaurant_city": `${pickRestaurant.address.city}`,
          "restaurant_state":`${pickRestaurant.address.state}`,
          "restaurant_zip":`${pickRestaurant.address.postal_code}`,
        }
        try{
          const resp = await fetch(`/api/create-itinerary-${userID}`, {
              method: 'POST',
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(itinerary_inputs),
              })
          if (resp.status !== 200) {
              alert("There has been an error");
              return false;
          }
        
          const data = await resp.json();

          if (data) {
            routeForm(event)
          }
          
          return data;
        }
        catch(error){
          console.error("THERE WAS AN ERROR!!!", error)
        };
      };

      const saveButton = (
        <div>
            <form action="/api/create-itinerary-<user_id>" method="post" id="create-itinerary" onSubmit={saveItinerary}>
              <button className="btn btn-outline-secondary" type="submit">Save This Itinerary</button>
            </form>
        </div>
      );

    ReactDOM.render(saveButton, document.querySelector(".save-itinerary-button"));
      }

    return (
            <div>
            <div>
            <p className="d-grid gap-2">
            <button className="btn btn-outline-secondary" 
                onClick={getLatLong}
                value={[props.lat, props.lng]}
            >
              Select Charger            
              </button></p>
            </div>  
            
            </div>

    )
}

function getDirectionsButton(){
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
}