import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css"
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";




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
    const [active, setActive] = React.useState("register");

    // const playExpandingAnimation = () => {
    //     setExpanded(true);
    //     setTimeout(() => {
    //     setExpanded(false);
    //     }, expandingTransition.duration * 1000 - 1500);
    // };

    const switchToRegister = () => {
        // playExpandingAnimation();
        setTimeout(() => {
            setActive("register");
        }, 400);
    };

    const switchtoLogin = () => {
        // playExpandingAnimation();
        setTimeout(() => {
            setActive("login");
        }, 400);
    };

  const contextValue = { switchToRegister, switchtoLogin };

    if (active == "login"){
        return (
            <AccountBox header="Welcome" instruction="Please sign in" form={<LoginPage />} /> 
        )
    }
    
    if (active == "register") {
        return (
            <AccountBox header="Register" instruction="Create an account" form={<RegisterPage />} />
        )
    }

}