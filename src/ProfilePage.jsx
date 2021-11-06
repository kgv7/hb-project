import React from "react";
import { useHistory } from "react-router-dom";


export default function ProfilePage(props) {

  const token = sessionStorage.getItem("token")
  const fname = sessionStorage.getItem("first_name")
  const lname = sessionStorage.getItem("last_name")
  const ev = sessionStorage.getItem("ev")

    return(
    <React.Fragment>
    <h1>Profile Page</h1>
    <div id="profile">
      Name: {fname} {lname}
    </div>
  </React.Fragment>
    )
}