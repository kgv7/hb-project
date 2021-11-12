import React from "react";
import { useHistory } from "react-router-dom";
import { AccountContext } from "./App";
import "./styles.css"


export default function LoginPage(props) {

    let history = useHistory();

    // switch forms
    const switchToRegister = React.useContext(AccountContext);


    const [inputs, setInputs] = React.useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    const routeChange = (event) => {
      const history = useHistory()
      history.push("/")
    }

    const handleSubmit = async event => {
      event.preventDefault();
      try{
        const resp = await fetch('/api/login', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(inputs),
            })
        if (resp.status !== 200) {
            alert("There has been an error");
            return false;
        }
      
        const data = await resp.json();
        alert("You are logged in");
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("first_name", data.user_fname)
        sessionStorage.setItem("last_name", data.user_lname)
        sessionStorage.setItem("ev", data.user_ev)
        // console.log(token)
        return data;
      }
      catch(error){
        console.error("THERE WAS AN ERROR!!!", error)
      };
    };

      return (
          <React.Fragment>
            <form action="/api/login" method="post" id="login" onSubmit={() => {handleSubmit(event); routeChange(event)}}>
              <p>
                  <label htmlFor="email">Email</label>
                  <input 
                    type="text" 
                    name="email" 
                    value={inputs.email}
                    onChange={handleChange}
                    id="email" 
                    placeholder="email" required />  
              </p>
  
              <p>
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={inputs.password}
                    onChange={handleChange}
                    id="password" 
                    placeholder="password" required /> 
              </p>
  
              <p>
                  <button type="submit">Submit</button>
              </p>
              </form>

        Don't have an account?
        <a href="#" onClick={switchToRegister}>
          Register Here
        </a>
          </React.Fragment>
        );
    };