import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css"
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { AccountContext } from "./App";

function AccountBox(props){

    return (
            <div className="account-container">
                <div className="account-top-container">
                    <div className="account-backdrop" />
                        <div className="account-header-text"> {props.header} </div>
                        <div className="account-small-text"> {props.instruction} </div>
                    </div>
                <div className="account-inner-container">{props.form}</div>
                </div>

    )}

export default function LoginRegisterForm(props) {

    // const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = React.useState("login");
    const contextValue = { switchToRegister, switchToLogin };


    // const playExpandingAnimation = () => {
    //     setExpanded(true);
    //     setTimeout(() => {
    //     setExpanded(false);
    //     }, expandingTransition.duration * 1000 - 1500);
    // };

    const switchToRegister = (event) => {
        // playExpandingAnimation();
        // setTimeout(() => {
            setActive("register");
        // }, 400);
    };

    const switchToLogin = (event) => {
        // playExpandingAnimation();
        // setTimeout(() => {
            setActive("login");
        // }, 400);
    };
  
 
    if (active === "login"){
        return (
            <AccountContext.Provider value={contextValue}>
                <AccountBox 
                    header="Welcome" 
                    instruction="Please sign in" 
                    form={<LoginPage />} 
                /> 
            </AccountContext.Provider>
        )
    }
    
    if (active === "register") {
        return (
            <AccountContext.Provider value={contextValue}>
                <AccountBox 
                    header="Register" 
                    instruction="Create an account" 
                    form={<RegisterPage />} 
                />
            </AccountContext.Provider>
        )
    }

}