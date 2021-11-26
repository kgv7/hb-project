import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";


export default function RegisterPage(props) {

    
    const [makes, getEVMakes] = useState([]);
    const [selectedMake,setValue] = useState('');
    const [models, getEVModels] = useState([]);
    const [selectedModel,setModelValue] = useState('');
    const [years, getEVYears] = useState([]);
    const [inputs, setInputs] = useState({});
    const history = useHistory();


  // grab list of manufacturers
      useEffect(() => {
      fetch('/api/ev-makes')
      .then((response) => response.json())
      .then((evMakesData) => {
          getEVMakes(evMakesData);
      })
      }, []);
  
      const carMakeOptions = makes.map(evMakes => <option value={evMakes}>{evMakes}</option>)
  
      // based on manufacturer selection, populate models
  
  
      const handleMakeSelect=(makeSelect)=>{
        console.log(makeSelect.currentTarget.value);
        setValue(makeSelect.currentTarget.value);
        handleChange(makeSelect);
        }
      
  
      useEffect(() => { 
        fetch(`/api/${selectedMake}`)
        .then((response) => response.json())
        .then((evModelData) => {
          console.log(evModelData)
          getEVModels(evModelData);
        })
      }, [selectedMake]);
          
      const carModelOptions = models.map(evModels => <option value={evModels}>{evModels}</option>)
  
      // based on models, populate years
  
      const handleModelSelect=(makeModelSelect)=>{
        console.log(makeModelSelect.currentTarget.value);
        setModelValue(makeModelSelect.currentTarget.value);
        handleChange(makeModelSelect);
        }
      
  
      useEffect(() => { 
        fetch(`/api/${selectedMake}-${selectedModel}`)
        .then((response) => response.json())
        .then((evYearData) => {
          getEVYears(evYearData);
        })
      }, [selectedModel]);
          
      const carYearOptions = years.map(evYears => <option value={evYears}>{evYears}</option>)
      
      // handle Submit
  

      const routeForm = (event) => {
        history.push("/"); 
        history.go(0);
      }
  
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      
      const handleSubmit = async event => {
        event.preventDefault();
        try{
          const resp = await fetch('/api/register', {
              method: 'POST',
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(inputs),
              })
          if (resp.status !== 200) {
              alert("There has been an error");
              return false;
          }
          const data = await resp.json();
          sessionStorage.setItem("token", data.access_token);
          sessionStorage.setItem("first_name", data.user_fname)
          sessionStorage.setItem("last_name", data.user_lname)
          sessionStorage.setItem("email", data.user_email)
          sessionStorage.setItem("user_id", data.user_id)
          sessionStorage.setItem("ev", data.user_ev)
          alert("You are logged in")
          console.log("this has come from backend", data);
          console.log(sessionStorage.getItem("token"))


          if (data) {
            routeForm(event)
          }

          return data;
        }
        catch(error){
          console.error("THERE WAS AN ERROR!!!", error)
        };
      };
  
      return (
          <React.Fragment>
            <div id="register-form">
              <form action="/api/register" method="post" id="register" onSubmit={handleSubmit}>
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
                  <p><button className="btn btn-outline-secondary" type="submit">Submit</button></p>
              </form>

            </div>
          </React.Fragment>
        );
    };