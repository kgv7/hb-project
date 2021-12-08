import React, {useState} from "react";
import "../static/form-styles.css";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import BackgroundPhoto from "./img/recharge-form-background.png";

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
                        <div className="switch-account-link"><a href="#" onClick={props.action}>
                        {props.formSwitch}
                        </a></div>
                </div>
                </div>

    )}




export default function LoginRegisterForm(props) {
    
    const [active, setActive] = useState("login");

    // const [isExpanded, setExpanded] = useState(false);
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
            <div className="account-div" style={{backgroundImage: `url(${BackgroundPhoto})`}}>
            {(console.log("login"))}

                <AccountBox 
                    header="Welcome" 
                    instruction="Please sign in" 
                    form={<LoginPage/>} 
                    prompt="Don't have an account?"
                    action= {switchToRegister}
                    formSwitch="Register Here"
                /> </div>
        )
    }
    if (active === "register") {
        return (
            <div className="account-div" style={{backgroundImage: `url(${BackgroundPhoto})`}}>
                            {console.log("register")}
   
                <AccountBox 
                    header="Register" 
                    instruction="Create an account" 
                    form={<RegisterPage />} 
                    prompt="Already have an account?"
                    action={switchToLogin}
                    formSwitch="Log In Here"
                />
                         </div>
        )
    }

}