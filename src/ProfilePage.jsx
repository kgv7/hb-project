import React from "react";
import { useHistory, Link, Router} from "react-router-dom";


export default function ProfilePage(props) {

  const token = sessionStorage.getItem("token")
  const fname = sessionStorage.getItem("first_name")
  const lname = sessionStorage.getItem("last_name")
  const ev = sessionStorage.getItem("ev")
  const userID = sessionStorage.getItem("user_id")

  const [evInfo, getEVInfo] = React.useState([]);
  
          React.useEffect(() => { 
            fetch(`api/profile/${ev}`)
            .then((response) => response.json())
            .then((evInfo) => {
              getEVInfo(evInfo);
            })
          }, [token]);
  
  const logOut = () => {
    token = sessionStorage.removeItem("token")
    fname = sessionStorage.removeItem("first_name")
    lname = sessionStorage.removeItem("last_name")
    ev = sessionStorage.removeItem("ev")
    userID = sessionStorage.removeItem("user_id")
  }

  // List out EV charging station - if any

  const [stationList, getStationList] = React.useState([])
  
  React.useEffect(() => {
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
    <React.Fragment>
    <h1>Profile Page</h1>
    <div id="profile">
      <p>Name: {fname} {lname}</p>
      <p>EV: {evInfo.year} {evInfo.make} {evInfo.model}</p>
      <p>EV Range: {evInfo.range}</p> 
      <p>Added EV Charging Stations:</p>
        <ul>{userStations}</ul>
      <p onClick={logOut}><a href="/">Logout</a></p>
    </div>
  </React.Fragment>
    )
}