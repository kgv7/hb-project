import React, {useState, useEffect} from "react";
import "../static/profile-styles.css";
import Lightning from "../src/img/background-lightning.png"


const token = sessionStorage.getItem("token")
const fname = sessionStorage.getItem("first_name")
const lname = sessionStorage.getItem("last_name")
const email = sessionStorage.getItem("email")
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
      <div className="added-station-info">
      <p className="header">Added EV Charging Stations:</p>
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
    <div className="row profile-details" id="user-car"> 
    <h1 className="profile-header-text">{fname} {lname}</h1>
    <h3>{evInfo.year} {evInfo.make} {evInfo.model} 
        <p>Range: {evInfo.range} miles</p></h3>
    <h5>{email}</h5>
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
    
    const userItinerary = itineraryList.map((itinerary) => itinerary).map(detail => <div>
                                                                          {/* <li value="itinerary-id">Trip #{detail.itinerary_id}</li> */}
                                                                          <div value="station">Station Name: {detail.station_name}</div>
                                                                          <div value="station-address">Station Address: {detail.station_address}, {detail.station_city}, {detail.station_state} {detail.station_zip}</div>
                                                                          <div value="charge-time">Charge Time: {detail.charge_time}</div>
                                                                          <div value="restaurant">Restaurant Name: {detail.restaurant_name}</div>
                                                                          <div value="restaurant-address">Restaurant Address: {detail.restaurant_address}, {detail.restaurant_city}, {detail.restaurant_state} {detail.restaurant_zip}</div>
                                                                          <div className="itinerary-line" value="line">⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡</div>
                                                                          </div>)

    return(
      <div>
      <p className="header">Saved Itineraries:</p>
        <ul>{userItinerary}</ul>
      </div>
    )
}


function SwitchForm(){
  const [active, setActive] = useState("itinerary");

  const switchToStation = (event) => {
    setActive("station");
    // document.querySelector(".added-stations-btn").className("active")

  };

  const switchToItinerary = (event) => {
    setActive("itinerary");
    // document.querySelector(".itinerary-btn").className("active")
  };

  const showStation = (          
    <div className="user-itinerary col"> 
    <StationList  
      action={switchToStation} 
    />
  </div>)

const showItinerary = (
  <div className="added-chargers col">
  <GetItinerary
    action={switchToItinerary}
  />
</div>
)

  if (active === "station"){ 
    console.log(active)
    return(showStation)
    }
  if (active === "itinerary") {
    console.log(active)
    return(showItinerary)
    }
}


export default function ProfilePage(props) {
  const logOut = () => {
    token = sessionStorage.removeItem("token")
    fname = sessionStorage.removeItem("first_name")
    lname = sessionStorage.removeItem("last_name")
    ev = sessionStorage.removeItem("ev")
    userID = sessionStorage.removeItem("user_id")
  }
    // if (!StationList){
    //   return(
    //     <React.Fragment>
    //     <div className="profile-container row" >
    //     <div className="col profile-info">
    //       <GetEVInfo />
    //     {/* <h1>Profile</h1> */}
    //     </div>
    //     <div className="row">
    //     <div className="user-itinerary col"> 
    //       <GetItinerary />
    //     </div>
    //     <div className="logout" onClick={logOut}><a href="/">Logout</a></div>
    //     </div></div>
    //   </React.Fragment>
    //     )
    // } else {

  

    const [active, setActive] = useState("itinerary");

    const switchToStation = (event) => {
      setActive("station");
    };

    const switchToItinerary = (event) => {
      setActive("itinerary");
    };

  function SwitchContent(){

    const showStation = (          
      <div className="user-itinerary col"> 
      <StationList  />
    </div>)

  const showItinerary = (
    <div className="added-chargers col">
    <GetItinerary
    />
  </div>
  )

    if (active === "station"){ 
      console.log(active)
      return(showStation)
      // ReactDOM.render("hi", document.querySelector(".station-content"))
      }
    if (active === "itinerary") {
      console.log(active)
      return(showItinerary)
      // ReactDOM.render("bye", document.querySelector(".itinerary-content"))
      }
  }

      return (
        <React.Fragment>
      <div className="profile-container">
        <div className="profile-box row">
          <div className="profile-top-container">
            <div className="profile-backdrop" />
          <GetEVInfo />

        </div>
        <div className="row profile-inner-container">
        <div className="button-row">
          {/* <div className="itinerary-btn"> */}
          <button className="col-6 btn btn-outline-secondary active itinerary-btn" onClick={switchToItinerary}>Saved Itineraries</button>
          {/* </div> */}
          {/* <div className="added-stations-btn"> */}
          <button className="col-6 btn btn-outline-secondary added-stations-btn" onClick={switchToStation}>Added Stations</button>
          {/* </div> */}
          </div>

        <div className="station-content"><SwitchContent/></div>

        {/* <div className="itinerary-content"></div> */}

 
        </div>
        <div className="row d-grid gap-2 logout-btn"> <div className="col-6" onClick={logOut}><a className="btn btn-outline-secondary" href="/">Logout</a></div>

    </div></div></div>
      </React.Fragment>
        )
    }
  // }

  