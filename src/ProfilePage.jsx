import React from "react";
import { useHistory, Link, Router} from "react-router-dom";


export default function ProfilePage(props) {

  const token = sessionStorage.getItem("token")
  const fname = sessionStorage.getItem("first_name")
  const lname = sessionStorage.getItem("last_name")
  const ev = sessionStorage.getItem("ev")

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
  }

    return(
    <React.Fragment>
    <h1>Profile Page</h1>
    <div id="profile">
      <p>Name: {fname} {lname}</p>
      <p>EV: {evInfo.year} {evInfo.make} {evInfo.model}</p>
      <p>EV Range: {evInfo.range}</p> 
      <p onClick={logOut}><a href="/">Logout</a></p>
    </div>
  </React.Fragment>
    )
}