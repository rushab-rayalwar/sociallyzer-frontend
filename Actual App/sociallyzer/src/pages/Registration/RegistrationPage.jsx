// third party imports
import { useRef, useState } from "react";
import axios from "axios";
import {motion} from "framer-motion";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

// local imports
import logoSVG from "../../assets/icons/logo.svg";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage(){

    const [errors,setErrors] = useState([]);
    const [registering, setRegistering] = useState(false); // Indicates whether the user registration request is in progress

    const backendURL = import.meta.env.VITE_BACKEND_URL; // NOTE THIS

    let navigate = useNavigate();

    let nameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();

    async function onSubmit(){
        try{
            console.log(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
            console.log("Sending details to",`${backendURL}/api/users/signup`);
            setRegistering(true);
            const res = await axios.post(`${backendURL}/api/users/signup`,{
                name:nameRef.current.value,
                email:emailRef.current.value,
                password:passwordRef.current.value
            });
            setRegistering(false);
            if(!res.success){
                setErrors(res.data.errors); // res.data stores the data received from the backend
                setRegistering(false);
            }
            console.log("Signup Success,", res.data);
            navigate("/");

        } catch(error){
            console.log(error.response.data);
            setErrors(error.response.data.errors || ['Something went wrong!'])
            setRegistering(false);
        }
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
                            <input type="string" id="name" placeholder="John Doe" ref={nameRef}></input>
                        </div>
                        <div className={`${styles.field} ${styles.email}`}>
                            <label htmlFor="email">Email</label>
                            <input type="string" id="email" placeholder="johndoe@xyz.com" ref={emailRef}></input>
                        </div>
                        <div className={`${styles.field} ${styles.password}`}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password Here" ref={passwordRef}></input>
                        </div>
                        <div className={styles.submitButton} onClick={onSubmit}>
                            <span>Register</span>
                            <div className={registering ? styles.buttonLoggingInBG : styles.buttonHoverBG}></div>
                        </div>
                    </div>
                </form>
                <div className={styles.loginLink}>
                    <span>Already have an account? <a onClick={()=>navigate("/login")}>Login</a> </span>
                </div>
                {errors && errors.length!=0 && <motion.div className={styles.errorsContainer}>
                    {errors.map(e=>{
                        return (
                            <div className={styles.error}>
                                <FontAwesomeIcon icon={faExclamation} className={styles.exclamation}></FontAwesomeIcon>
                                {e}
                            </div>
                            )}
                        )
                    }
                </motion.div>}
                {registering && <motion.div className={styles.disclaimerContainer} initial={{opacity:0}} animate={{opacity:1}} transition={{ease:"easeOut", duration:0.5}}>
                Heads up! This app runs on a free hosting service, so the first request after inactivity might take a little longer while the server spins up. Subsequent requests will be much faster.
                </motion.div>}
            </div>
            </div>
        </>
    )
}