import React from "react";
import { useHistory } from "react-router-dom";
import { Context } from "./Context";


export default function LoginPage(props) {

    const { store , actions } = React.useContext(Context)
    // const token = sessionStorage.getItem("token")

    const [inputs, setInputs] = React.useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      actions.login(inputs).then(() => {
        const history = useHistory()
        history.push("/")
      })
    };

      return (
          <React.Fragment>
            <h1>Login</h1>
            <div id="login-form">
              {(store.token && store.token != "" && store.token!=undefined) ? "You are logged in with " + store.token :
            <form action="/login" method="post" id="login" onSubmit={() => {handleSubmit(event); routeChange(event)}}>
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
            }</div>
          </React.Fragment>
        );
    };