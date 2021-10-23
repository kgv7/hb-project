const { cloneElement } = require("react");

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
  
  // grab list of charging station levels
  const [levels, getEVLevels] = React.useState([]);

  React.useEffect(() => {
  fetch('/api/charging-level')
  .then((response) => response.json())
  .then((evChargingData) => {
      getEVLevels(evChargingData);
  })
  }, []);

  const chargingLevelOptions = levels.map((evChargingData) => evChargingData.charging_level).map(level => <option value={level}>{level}</option>)
  
  const [inputs, setInputs] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  console.log(inputs)

  const [totalHours, setTotalHours] = React.useState([]);

  const calculateHours = (event) => {
    event.preventDefault();
    const range = parseInt(inputs.evRange)

    const miles = parseInt(inputs.currentMiles)


    if (inputs.chargingLevel == 'Level 1'){
      setTotalHours(((range * .8) - (miles))/5);
    } else if (inputs.chargingLevel == 'Level 2'){
      setTotalHours(((range * .8) - (miles))/20);
    } else if (inputs.chargingLevel == 'Level 3'){
      setTotalHours(((range * .8) - (miles))/80);
    }
  }
  console.log(`totalHours: ${totalHours}`)

  return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-8" id="map">
            <h1>Find Charger</h1>
              Insert Map Here - MVP
              <p></p>
            </div>
            <div className="col-md-4" id="calculator">
                <h3>Calculate Charge Time:</h3>
                <p>Based on your EV: 2019 Tesla Model S Standard Range</p>
                <form id="calculator-form">
                <p>
                  <label htmlFor="charging-level">Charging Station Level</label>
                  
                  <select 
                        name="chargingLevel" 
                        id="charging-level" 
                        value={inputs.level}
                        onChange={handleChange}
                      >
                        <option defaultValue="Select a Level">
                          Select a Level
                        </option>
                  {chargingLevelOptions}
                  </select>
                  </p>
                  <p>
                      <label htmlFor="current-miles">Current Miles</label>
                      <input 
                        type="text" 
                        name="currentMiles" 
                        value={inputs.miles}
                        id="current-miles" 
                        onChange={handleChange}
                        required 
                      /> 
                  </p>
                  <p>
                      <label htmlFor="ev-range">Your EV's Range</label>
                      <input 
                        type="text" 
                        name="evRange"
                        value={inputs.range}
                        placeholder="285"
                        id="ev-range" 
                        onChange={handleChange}
                      /> 
                  </p>
                  <button type="submit" onClick={calculateHours}>Calculate</button>
                  <div>
                    <label htmlFor="calculation" >Minutes for 80% Charge:</label>
                    <div id="total-hours">{totalHours} hours</div>
                    <p>(80% is the recommended limit for rapid charging)</p>
                  </div>

                </form>

            </div>
          </div>
        </React.Fragment>
      );
  };

function AddStationPage(props) {
    return (
        <React.Fragment>
          <h1>Add Station</h1>
          <div id="add-station-form">
            Add Station Form Coming in v2
          </div>
        </React.Fragment>
      );
  };

function LoginPage(props) {

  const [inputs, setInputs] = React.useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`${inputs.email} is logged in`);
    // console.log(JSON.stringify(inputs))
    fetch('/login', {
      method: 'POST',
      headers: {"content_type":"application/json",},
      body: JSON.stringify(inputs),
    })
    .then(response => response.json())
    .then(result => {
      console.log(`result: ${result}`)
      // sessionStorage.setItem("session", result)
      console.log('Success:', result);
    })
  }
    return (
        <React.Fragment>
          <h1>Login</h1>
          <div id="login-form">
          <form action="/login" method="post" id="login" onSubmit={handleSubmit}>
            <p>
                <label htmlFor="email">Email</label>
                <input 
                  type="text" 
                  name="email" 
                  value={inputs.email}
                  onChange={handleChange}
                  id="email" required />  
            </p>

            <p>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={inputs.password}
                  onChange={handleChange}
                  id="password" required /> 
            </p>

            <p>
                <button type="submit">Submit</button>
            </p>
            </form>
          </div>
        </React.Fragment>
      );
  };


function RegisterPage(props) {

  // grab list of manufacturers
  const [makes, getEVMakes] = React.useState([]);

    React.useEffect(() => {
    fetch('/api/ev-makes')
    .then((response) => response.json())
    .then((evMakesData) => {
        getEVMakes(evMakesData);
    })
    }, []);

    const carMakeOptions = makes.map(evMakes => <option value={evMakes}>{evMakes}</option>)

    // based on manufacturer selection, populate models

    const [selectedMake,setValue] = React.useState('');

    const handleMakeSelect=(makeSelect)=>{
      console.log(makeSelect.currentTarget.value);
      setValue(makeSelect.currentTarget.value);
      handleChange(makeSelect);
      }
    
    const [models, getEVModels] = React.useState([]);

        React.useEffect(() => { 
          fetch(`api/${selectedMake}`)
          .then((response) => response.json())
          .then((evModelData) => {
            getEVModels(evModelData);
          })
        }, [selectedMake]);
        
      const carModelOptions = models.map(evModels => <option value={evModels}>{evModels}</option>)

    // based on models, populate years
    const [selectedModel,setModelValue] = React.useState('');

    const handleModelSelect=(makeModelSelect)=>{
      console.log(makeModelSelect.currentTarget.value);
      setModelValue(makeModelSelect.currentTarget.value);
      handleChange(makeModelSelect);
      }
    
    const [years, getEVYears] = React.useState([]);

        React.useEffect(() => { 
          fetch(`api/${selectedMake}-${selectedModel}`)
          .then((response) => response.json())
          .then((evYearData) => {
            getEVYears(evYearData);
          })
        }, [selectedModel]);
        
      const carYearOptions = years.map(evYears => <option value={evYears}>{evYears}</option>)
    
    // handle Submit

    const [inputs, setInputs] = React.useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = () => {
      event.preventDefault();
      alert(inputs.make);
      fetch('/register', {
        method: 'POST',
        headers: {"content_type":"application/json",},
        body: JSON.stringify(inputs),
      })
      .then(response => response.json())
      .then(({newUser}) => {
        console.log('Success:', newUser);
      })
    }

    return (
        <React.Fragment>
          <h1>Register</h1>
          <div id="register-form">
            <form action="/register" method="post" id="register" onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="fname">First Name</label>
                    <input 
                      type="text" 
                      name="fname" 
                      value={inputs.fname} 
                      onChange={handleChange}
                      id="fname" required 
                    />
                </p>

                <p>
                    <label htmlFor="lname">Last Name</label>
                    <input 
                      type="text" 
                      name="lname" 
                      value={inputs.lname} 
                      onChange={handleChange}
                      id="lname" required 
                    /> 
                </p>

                <p>
                    <label htmlFor="email">Email</label>
                    <input 
                      type="text" 
                      name="email" 
                      value={inputs.email} 
                      onChange={handleChange}
                      id="email" required 
                    />  
                </p>

                <p>
                    <label htmlFor="password">Create Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={inputs.password} 
                      onChange={handleChange}
                      id="password" required 
                    /> 
                </p>

                <p>
                    <label htmlFor="make">Make</label>
                    <select 
                      name="make" 
                      id="make" 
                      value={inputs.make} 
                      onChange={handleMakeSelect}
                    >
                      <option defaultValue="Select a Make">
                        Select a Make
                      </option>
                      {carMakeOptions}
                    </select> 
                </p>
                <p>
                    <label htmlFor="model">Model</label>
                    <select 
                      name="model" 
                      id="model" 
                      value={inputs.model} 
                      onChange={handleModelSelect}
                    >
                      <option defaultValue="Select a Model">
                          Select a Model
                        </option>
                        {carModelOptions}
                    </select> 
                </p>
                <p>
                    <label htmlFor="year">Year</label>
                    <select 
                      name="year" 
                      id="year" 
                      onChange={handleChange}
                      value={inputs.year}
                    >
                      <option defaultValue="Select a Year">
                          Select a Year
                        </option>
                        {carYearOptions}
                    </select> 
                </p>
                <p><button type="submit">Submit</button></p>
            </form>
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