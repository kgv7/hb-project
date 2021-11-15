import React from "react";
import { useHistory } from "react-router-dom";
import { AccountContext } from "./App";
import "./styles.css"


export default function LoginPage(props) {

    const switchToRegister = React.useContext(AccountContext);

    const [inputs, setInputs] = React.useState({});

    // const history = useHistory();
    // const routeForm = (event) => {
    //   history.push("/", [sessionStorage]);
    // }
    // const [login, setLoginForm] = React.useState(null)

    // const onFormLoad = ref => {
    //   setLoginForm(ref);
    // };

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
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
            <form action="/api/login" method="post" id="login" onSubmit={() => {handleSubmit(event)}}>
              <div className="form-group row">
                  <div className="col-sm-10">
                  <input 
                    type="text" 
                    name="email" 
                    value={inputs.email}
                    onChange={handleChange}
                    id="email" 
                    placeholder="email" required />  
              </div></div>
  
              <div className="form-group row">
                  <div className="col-sm-10">
                  <input 
                    type="password" 
                    name="password" 
                    value={inputs.password}
                    onChange={handleChange}
                    id="password" 
                    placeholder="password" required /> 
              </div></div>
              <p>
                  <button type="submit"> Submit</button>
              </p>
              </form>

        Don't have an account?
        <a href="#register" onClick={switchToRegister}>
          Register Here
        </a>
          </React.Fragment>
        );
    };
