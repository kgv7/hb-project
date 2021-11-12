import React from "react";
import { AccountContext } from "./App";

export default function RegisterPage(props) {

    // switch forms
    const switchToLogin = React.useContext(AccountContext);

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
    
      // const handleSubmit = () => {
      //   event.preventDefault();
      //   alert(inputs.make);
      //   fetch('api/register', {
      //     method: 'POST',
      //     headers: {"content_type":"application/json",},
      //     body: JSON.stringify(inputs),
      //   })
      //   .then(response => response.json())
      //   .then(({newUser}) => {
      //     console.log('Success:', newUser);
      //   })
      // }

      const handleSubmit = async event => {
        event.preventDefault();
        try{
          const resp = await fetch('api/register', {
              method: 'POST',
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(inputs),
              })
          if (resp.status !== 200) {
              console.log(resp)
              alert("There has been an error");
              return false;
          }
        
          const data = await resp.json();
          console.log("this has come from backend", data);
          sessionStorage.setItem("token", data.access_token);
          return data;
        }
        catch(error){
          console.error("THERE WAS AN ERROR!!!", error)
        };
      };
  
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
              Already have an account?
              <a href="#" onClick={switchToLogin}>
                Login Here
              </a>
            </div>
          </React.Fragment>
        );
    };