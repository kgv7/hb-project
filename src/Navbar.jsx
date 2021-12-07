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
        <nav className="navbar navbar-expand-lg navbar-light pt-4">
          <Link
            to="/"
            className="navbar-brand d-flex justify-content-center"
          >
            <img src={logo} height="30" />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#rechargeNavbar" aria-controls="rechargeNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse" id="rechargeNavbar">
            
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                to="/find-charger"
                activeClassName="navlink-active"
                className="nav-link"
                >
                  Find Charger
                </NavLink>
              </li>
            
              <li className="nav-item">
                <NavLink
                  to="/add-station"
                  activeClassName="navlink-active"
                  className="nav-link"
                >
                  Add Station
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/about-charging"
                  activeClassName="navlink-active"
                  className="nav-link"
                >
                  About
                </NavLink>
              </li>
              </ul>
              <span className="nav-item">
                <NavLink
                    to="/account"
                    activeClassName="navlink-active"
                    className="nav-link"
                  >
                    <button className="btn btn-outline-secondary">Login/Register</button>
                  
                  </NavLink>
              </span>


              </div>
        </nav>
          )

    } else {
      return(
    // <nav>


    // <section className="d-flex justify-content-center">
    // <Link
    //   to="/"
    //   className="navbar-brand d-flex justify-content-center"
    // >
    //   <img src={logo} height="30" />
    // </Link>
    
    //   <NavLink
    //     to="/find-charger"
    //     activeClassName="navlink-active"
    //     className="nav-link nav-item"
    //   >
    //     Find Charger
    //   </NavLink>
    //   <NavLink
    //     to="/add-station"
    //     activeClassName="navlink-active"
    //     className="nav-link nav-item"
    //   >
    //     Add Station
    //   </NavLink>
    //   <NavLink
    //           to="/about-charging"
    //           activeClassName="navlink-active"
    //           className="nav-link nav-item"
    //         >
    //           About
    //   </NavLink>
    //   {/* <NavLink
    //     to="/profile"
    //     activeClassName="navlink-active"
    //     className="nav-link nav-item"
    //   >
    //     Profile
    //   </NavLink> */}

    //   <div className="nav-item">
    //             <NavLink
    //                 to="/profile"
    //                 activeClassName="navlink-active"
    //                 className="nav-link nav-item "
    //               >
    //                 <button className="btn btn-outline-secondary">Profile</button>
                  
    //               </NavLink>
    //           </div>

    //     </section>
    //   </nav>
      
      <nav className="navbar navbar-expand-lg navbar-light pt-4">
      <Link
        to="/"
        className="navbar-brand d-flex justify-content-center"
      >
        <img src={logo} height="30" />
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#rechargeNavbar" aria-controls="rechargeNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        <div className="collapse navbar-collapse" id="rechargeNavbar">
        
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink
            to="/find-charger"
            activeClassName="navlink-active"
            className="nav-link"
            >
              Find Charger
            </NavLink>
          </li>
        
          <li className="nav-item">
            <NavLink
              to="/add-station"
              activeClassName="navlink-active"
              className="nav-link"
            >
              Add Station
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/about-charging"
              activeClassName="navlink-active"
              className="nav-link"
            >
              About
            </NavLink>
          </li>
          </ul>
          <span className="nav-item">
            <NavLink
                to="/profile"
                activeClassName="navlink-active"
                className="nav-link"
              >
                <button className="btn btn-outline-secondary">Profile</button>
              
              </NavLink>
          </span>


          </div>
    </nav>)
  };
};