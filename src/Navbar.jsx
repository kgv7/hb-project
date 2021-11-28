import React from "react";
import { Link, NavLink, Switch } from "react-router-dom";
import logo from "./App";
import brand from "./App";
import Homepage from "./Homepage";


export default function Navbar(props) {
    const { logo, brand } = props;
    const token = sessionStorage.getItem("token")

    if (!token) {
      return (
        <nav>
          <Link
            to="/"
            className="navbar-brand d-flex justify-content-center"
          >
            <img src={logo} height="30" />
          </Link>
    
          <section className="d-flex justify-content-center">
            <NavLink
              to="/find-charger"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              Find Charger
            </NavLink>
            <NavLink
              to="/add-station"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              Add Station
            </NavLink>
            <NavLink
              to="/about-charging"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              About
            </NavLink>
            <NavLink
                to="/account"
                activeClassName="navlink-active"
                className="nav-link nav-item"
              >
                <button className="btn btn-outline-secondary">Login/Register</button>
               
              </NavLink>
              </section></nav>
          )

    } else {
      return(
    <nav>
    <Link
      to="/"
      className="navbar-brand d-flex justify-content-center"
    >
      <img src={logo} height="30" />
    </Link>

    <section className="d-flex justify-content-center">
      <NavLink
        to="/find-charger"
        activeClassName="navlink-active"
        className="nav-link nav-item"
      >
        Find Charger
      </NavLink>
      <NavLink
        to="/add-station"
        activeClassName="navlink-active"
        className="nav-link nav-item"
      >
        Add Station
      </NavLink>
      <NavLink
              to="/about-charging"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              About
      </NavLink>
      <NavLink
        to="/profile"
        activeClassName="navlink-active"
        className="nav-link nav-item"
      >
        Profile
      </NavLink>
        </section>
      </nav>)
  };
};