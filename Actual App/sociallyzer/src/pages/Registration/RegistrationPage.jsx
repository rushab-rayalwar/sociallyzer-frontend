// third party imports
import { useRef } from "react";
import axios from "axios";

// local imports
import logoSVG from "../../assets/icons/logo.svg";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage(){

    const backendURL = import.meta.env.VITE_BACKEND_URL; // NOTE THIS
    console.log(backendURL, "Backend URL");

    const name = useRef();
    const email = useRef();
    const password = useRef();

    // event handlers
    async function onSubmit(){
        let data = {
            name : name.current.value,
            email : email.current.value,
            password : password.current.value
        };
        await axios.post(  // NOTE THIS
            backendURL+"/api/users/signup",
            data,
            {
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
    }
    return(
        <>
        <div className={styles.background}>
            <div className={styles.main}>
                <div className={styles.title}>
                    <img src={logoSVG} alt="logo"></img>
                    <span>SOCIALLYZER</span>
                </div>
                <form className={styles.glass}>
                    <div className={styles.formElements}>
                        <div className={`${styles.field} ${styles.name}`}>
                            <label htmlFor="name">Name</label>
                            <input type="string" id="name" placeholder="John Doe" ref={name}></input>
                        </div>
                        <div className={`${styles.field} ${styles.email}`}>
                            <label htmlFor="email">Email</label>
                            <input type="string" id="email" placeholder="johndoe@xyz.com" ref={email}></input>
                        </div>
                        <div className={`${styles.field} ${styles.password}`}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password Here" ref={password}></input>
                        </div>
                        <div className={styles.submitButton} onClick={onSubmit}>
                            <span>Register</span>
                        
                            <div className={styles.buttonHoverBG}></div>
                        </div>
                    </div>
                </form>
                <div className={styles.loginLink}>
                    <span>Already have an account? <a>Login</a> </span>
                </div>
            </div>
            </div>
        </>
    )
}