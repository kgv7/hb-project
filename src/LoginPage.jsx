import React from "react";


export default function LoginPage(props) {

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