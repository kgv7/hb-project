import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./App";
import brand from "./App";
// import { setLogin } from "./Global";

export default function Navbar(props) {
    const { logo, brand } = props;
      
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
          {/* { !token ?
          <div> */}
            <ReactRouterDOM.NavLink
              to="/login"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              Login
            </ReactRouterDOM.NavLink>
            <ReactRouterDOM.NavLink
              to="/register"
              activeClassName="navlink-active"
              className="nav-link nav-item"
            >
              Register
            </ReactRouterDOM.NavLink>
            {/* </div> */}
          {/* :
            <ReactRouterDOM.NavLink
            to="/profile"
            activeClassName="navlink-active"
            className="nav-link nav-item"
            >
              Profile
            </ReactRouterDOM.NavLink>
          } */}
        </section>
      </nav>
    );
  }