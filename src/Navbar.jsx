import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./App";
import brand from "./App";
// import { setLogin } from "./Global";

export default function Navbar(props) {
    const { logo, brand } = props;
    const token = sessionStorage.getItem("token")
    if (!token) {
      return (
        <nav>
          <ReactRouterDOM.Link
            to="/"
            className="navbar-brand d-flex justify-content-center"
          >
            <img src={logo} height="30" />
          </ReactRouterDOM.Link>
    
          <section className="d-flex justify-content-center">
            <ReactRouterDOM.NavLink
              to="/find-charger"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              Find Charger
            </ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink
              to="/add-station"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              Add Station
            </ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink
              to="/about-charging"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              About EV Charging
            </ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink
                to="/account"
                activeClassName="navlink-active"
                className="nav-link nav-item"
              >
                <button className="btn btn-outline-secondary">Login/Register</button>
              </ReactRouterDOM.NavLink>
             {/* <ReactRouterDOM.NavLink
                to="/login"
                activeClassName="navlink-active"
                className="nav-link nav-item"
              >
                Login
              </ReactRouterDOM.NavLink> */}
              {/* <ReactRouterDOM.NavLink
                to="/register"
                activeClassName="navlink-active"
                className="nav-link nav-item"
              >
                Register
              </ReactRouterDOM.NavLink> */}
              </section></nav>
          )

    } else {
      return(
    <nav>
    <ReactRouterDOM.Link
      to="/"
      className="navbar-brand d-flex justify-content-center"
    >
      <img src={logo} height="30" />
    </ReactRouterDOM.Link>

    <section className="d-flex justify-content-center">
      <ReactRouterDOM.NavLink
        to="/find-charger"
        activeClassName="navlink-active"
        className="nav-link nav-item"
      >
        Find Charger
      </ReactRouterDOM.NavLink>
      <ReactRouterDOM.NavLink
        to="/add-station"
        activeClassName="navlink-active"
        className="nav-link nav-item"
      >
        Add Station
      </ReactRouterDOM.NavLink>
      <ReactRouterDOM.NavLink
              to="/about-charging"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              About EV Charging
      </ReactRouterDOM.NavLink>
      <ReactRouterDOM.NavLink
        to="/profile"
        activeClassName="navlink-active"
        className="nav-link nav-item"
      >
        Profile
      </ReactRouterDOM.NavLink>
        </section>
      </nav>)
  };
};