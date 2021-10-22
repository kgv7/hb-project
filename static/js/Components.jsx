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
            Insert Map Here - MVP
          </div>
          <div id="calculator">
              Insert Calculator Here - MVP
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
    fetch('/login', {
      method: 'POST',
      body: inputs,
    })
    .then(response => response.json())
    .then(result => {
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
                  onChange={handleChange}
                  id="email" required />  
            </p>

            <p>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  name="password" 
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