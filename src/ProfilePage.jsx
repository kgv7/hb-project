import React, {useState, useEffect} from "react";

const token = sessionStorage.getItem("token")
const fname = sessionStorage.getItem("first_name")
const lname = sessionStorage.getItem("last_name")
const ev = sessionStorage.getItem("ev")
const userID = sessionStorage.getItem("user_id")

function StationList(props) {
  const [stationList, getStationList] = useState([]);
  // List out EV charging station - if any

  useEffect(() => {
    fetch(`/api/station-list-${userID}`)
    .then((response) => response.json())
    .then((evStationList) => {
      console.log(evStationList)
      getStationList(evStationList.info);
    })
    }, []);
    
    const userStations = stationList.map((station) => station).map(stat => <div><li value="station-name">{stat[0]}</li>
                                                                          <div value="address"> {stat[1]}, {stat[2]}, {stat[3]} {stat[4]}</div>
                                                                          </div>)

    return(
      <div>
      <p>Added EV Charging Stations:</p>
        <ul>{userStations}</ul>
      </div>
    )
}

function GetEVInfo() {
  const [evInfo, getEVInfo] = useState([]);
  
  useEffect(() => { 
    fetch(`api/profile/${ev}`)
    .then((response) => response.json())
    .then((evInfo) => {
      getEVInfo(evInfo);
    })
  });

  return (
    <div id="profile">
      <p>Name: {fname} {lname}</p>
      <p>EV: {evInfo.year} {evInfo.make} {evInfo.model}</p>
      <p>EV Range: {evInfo.range}</p> 
  </div>
  )
}

function GetItinerary(props) {
  const [itineraryList, getItineraryList] = useState([]);
  // List out saved itineraries - if any

  useEffect(() => {
    fetch(`/api/saved-itinerary-${userID}`)
    .then((response) => response.json())
    .then((itineraryList) => {
      console.log(itineraryList)
      getItineraryList(itineraryList.info);
    })
    }, []);
    
    const userItinerary = itineraryList.map((itinerary) => itinerary).map(detail => <div><li value="itinerary-id">Trip #{detail.itinerary_id}</li>
                                                                          <div value="station">Station Name: {detail.station_name}</div>
                                                                          <div value="station-address">Station Address: {detail.station_address}, {detail.station_city}, {detail.station_state} {detail.station_zip}</div>
                                                                          <div value="charge-time">Charge Time: {detail.charge_time}</div>
                                                                          <div value="restaurant">Restaurant Name: {detail.restaurant_name}</div>
                                                                          <div value="restaurant-address">Restaurant Address: {detail.restaurant_address}, {detail.restaurant_city}, {detail.restaurant_state} {detail.restaurant_zip}</div>
                                                                          </div>)

    return(
      <div>
      <p>Saved Itineraries</p>
        <ul>{userItinerary}</ul>
      </div>
    )
}


export default function ProfilePage(props) {
  const logOut = () => {
    token = sessionStorage.removeItem("token")
    fname = sessionStorage.removeItem("first_name")
    lname = sessionStorage.removeItem("last_name")
    ev = sessionStorage.removeItem("ev")
    userID = sessionStorage.removeItem("user_id")
  }


    if (!StationList){
      return(
        <React.Fragment>
        <h1>Profile Page</h1>
          <GetEVInfo />
        <div id="user-itinerary"> 
          <GetItinerary />
        </div>
        <div onClick={logOut}><a href="/">Logout</a></div>
      </React.Fragment>
        )
    } else {
      return(
        <React.Fragment>
        <h1>Profile Page</h1>
          <GetEVInfo />
        <div id="user-itinerary"> 
          <GetItinerary />
        </div>
        <div className="added-chargers">
          <StationList />
        </div>
        <div onClick={logOut}><a href="/">Logout</a></div>
      </React.Fragment>
        )
    }
  }