import React from "react";
import "../static/styles.css"
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function AccountBox(props){

    const token = sessionStorage.getItem("token")


    return (
            <div className="account-container">
                <div className="account-top-container">
                    <div className="account-backdrop" />
                        <div className="account-header-text"> {props.header} </div>
                        <div className="account-small-text"> {props.instruction} </div>
                    </div>
                <div className="account-inner-container">
                    <div>{props.form}</div>
                    <div>{props.prompt}</div>
                        <div><a href="#" onClick={props.action}>
                        {props.formSwitch}
                        </a></div>
                </div>
                </div>

    )}



export default function LoginRegisterForm(props) {

    // const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = React.useState("login");
    // const contextValue = { switchToRegister, switchToLogin };


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
                <AccountBox 
                    header="Welcome" 
                    instruction="Please sign in" 
                    form={<LoginPage/>} 
                    prompt="Don't have an account?"
                    action= {switchToRegister}
                    formSwitch="Register Here"
                /> 
        )
    }
    if (active === "register") {
        return (
                <AccountBox 
                    header="Register" 
                    instruction="Create an account" 
                    form={<RegisterPage />} 
                    prompt="Already have an account?"
                    action={switchToLogin}
                    formSwitch="Log In Here"
                />
        )
    }

}