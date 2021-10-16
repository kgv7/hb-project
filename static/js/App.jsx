function App() {
    const [melons, setMelons] = React.useState({});
  
    React.useEffect(() => {
      fetch('/api/melons')
      .then((response) => response.json())
      .then((melonData) => {
        setMelons(melonData);
      })
    }, []);
  
    return (
      <ReactRouterDOM.BrowserRouter>
        <Navbar logo="/static/img/placeholder-logo.png" brand="Recharge"/>
        <div className="container-fluid">
          <ReactRouterDOM.Route exact path="/">
            <Homepage />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/find-charger">
            <FindChargerPage />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/add-station">
            <AddStationPage />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/login">
            <LoginPage />
          </ReactRouterDOM.Route>
          <ReactRouterDOM.Route exact path="/register">
            <RegisterPage />
          </ReactRouterDOM.Route>
        </div>
      </ReactRouterDOM.BrowserRouter>
    );
  }
  
  ReactDOM.render(<App />, document.querySelector("#root"));