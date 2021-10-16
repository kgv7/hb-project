function Homepage(props) {
    return (
      <div id="home-banner" className="row">
        <div className="col">
          <h1>Recharge</h1>
          <p className="lead">Tagline</p>
        </div>
      </div>
    );
  }

function FindChargerPage(props) {
    return (
        <React.Fragment>
          <h1>Find Charger</h1>
          <div id="map">
            Insert Map Here
          </div>
          <div id="calculator">
              Insert Calculator Here
          </div>
        </React.Fragment>
      );
  };

function AddStationPage(props) {
    return (
        <React.Fragment>
          <h1>Add Station</h1>
          <div id="add-station-form">
            Add Station Form
          </div>
        </React.Fragment>
      );
  };

function LoginPage(props) {
    return (
        <React.Fragment>
          <h1>Login</h1>
          <div id="login-form">
            Login Form
          </div>
        </React.Fragment>
      );
  };

function RegisterPage(props) {
    return (
        <React.Fragment>
          <h1>Register</h1>
          <div id="register-form">
            Register Form
          </div>
        </React.Fragment>
      );
  };

function Navbar(props) {
    const { logo, brand } = props;
  
    return (
      <nav>
        <ReactRouterDOM.Link
          to="/"
          className="navbar-brand d-flex justify-content-center"
        >
          <img src={logo} height="30" />
          <span>{brand}</span>
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
        </section>
      </nav>
    );
  }