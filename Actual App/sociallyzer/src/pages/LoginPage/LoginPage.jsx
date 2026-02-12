// third party imports
import { useRef, useState } from "react";
import axios from "axios";
import {motion} from "framer-motion";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// local imports
import logoSVG from "../../assets/icons/logo.svg";
import styles from "./LoginPage.module.css";
import { loginUser } from "../../redux/features/user/userThunk.js";
import { addError } from "../../redux/features/user/userSlice.js";

export default function LoginPage(){

    const backendURL = import.meta.env.VITE_BACKEND_URL; // NOTE THIS

    let navigate = useNavigate();
    let dispatch = useDispatch();

    let {loggedIn, errors, loggingIn } = useSelector(state=>state.user);

    let emailRef = useRef();
    let passwordRef = useRef();

    useEffect(()=>{
        if(loggedIn){
            navigate("/home");
        }   
    },[loggedIn]);

    async function onSubmit(){
        if(emailRef.current.value.trim() === "" && !errors.includes("Enter a valid email")){ 
            dispatch(addError("Enter a valid email"));
        }
        if(passwordRef.current.value.trim() === "" && !errors.includes("Password is required")){
            dispatch(addError("Password is required"));
        }
        if( emailRef.current.value.trim() != "" && passwordRef.current.value.trim() != "" ) dispatch(loginUser({email:emailRef.current.value, password:passwordRef.current.value}));
    }
    return(
        <>
        <div className={styles.background}>
            <div className={styles.main}>
                <div className={styles.title}>
                    <img src={logoSVG} alt="logo"></img>
                    <span>SOCIALLYZER</span>
                </div>
                <form className={styles.glass} onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmit();
                }}>
                    <div className={styles.formElements}>
                        {/* <div className={`${styles.field} ${styles.name}`}>
                            <label htmlFor="name">Name</label>
                            <input type="string" id="name" placeholder="John Doe" ref={nameRef}></input>
                        </div> */}
                        <div className={`${styles.field} ${styles.email}`}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" placeholder="johndoe@xyz.com" ref={emailRef}></input>
                        </div>
                        <div className={`${styles.field} ${styles.password}`}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password Here" ref={passwordRef}></input>
                        </div>
                        <button type="submit" className={styles.submitButton}>
                            <span>Login</span>
                            <div className={loggingIn ? styles.buttonLoggingInBG : styles.buttonHoverBG}></div>
                        </button>
                    </div>
                </form>
                <div className={styles.loginLink}>
                    <span>Create new account? <a onClick={()=>navigate("/register")}>Register</a> </span>
                </div>
                {errors && errors.length!=0 && <motion.div className={styles.errorsContainer} initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeOut", duration:0.5}}>
                    {errors.map((e, index)=>{ // PASSING INDEXES AS KEY IS RISKY
                        return (
                            <div className={styles.error} key={index}>
                                <FontAwesomeIcon icon={faExclamation} className={styles.exclamation}></FontAwesomeIcon>
                                {e}
                            </div>
                            )}
                        )
                    }
                </motion.div>}
                {/* {loggingIn && <motion.div className={styles.errorsContainer} initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeOut", duration:0.5}}>
                    DISCLAIMER : The first request (login) to the backend might take upto 20 seconds
                </motion.div>} */}
                {loggingIn && <motion.div className={styles.disclaimerContainer} initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeOut", duration:0.5}}>
                Heads up! This app runs on a free hosting service, so the first request after inactivity might take a little longer while the server spins up. Subsequent requests will be much faster.
                </motion.div>}
            </div>
            </div>
        </>
    )
}