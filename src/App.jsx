import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/styles.css"
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import FindChargerPage from "./FindChargerPage";
import AddStationPage from "./AddStationPage";
import LoginRegisterForm from "./AccountContainer";
import ProfilePage from "./ProfilePage";
import AboutPage from "./AboutPage";

export default function App() {  

  return (
  <React.Fragment>
    <BrowserRouter>
      <Navbar logo="./img/recharge-logo.png" brand="Recharge"/>
      <div className="main-container-fluid">
      <Switch>
          <Route exact path="/" component={Homepage} />
          
          <Route exact path="/find-charger" component={FindChargerPage} />

          <Route exact path="/add-station" component={AddStationPage} />

          <Route exact path="/about-charging" component={AboutPage} />

          <Route exact path="/account" component={LoginRegisterForm} />

          <Route exact path="/profile" component={ProfilePage} />
      </Switch>
      </div>
    </BrowserRouter>

  </React.Fragment>
  );
  };

  
  // ReactDOM.render(<App />, document.querySelector("#root"));
