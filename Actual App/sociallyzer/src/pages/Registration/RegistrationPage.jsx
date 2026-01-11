// third party imports
import { useRef, useState } from "react";
import axios from "axios";
import {motion} from "framer-motion";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// local imports
import logoSVG from "../../assets/icons/logo.svg";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage(){

    const [errors,setErrors] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL; // NOTE THIS

    let nameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();

    async function onSubmit(){
        try{
            console.log(nameRef.current, emailRef.current, passwordRef.current);
            const res = await axios.post(`${backendURL}/api/users/signup`,{
                name:nameRef.current.value,
                email:emailRef.current.value,
                password:passwordRef.current.value
            });
            if(!res.success){
                setErrors(res.errors);
            }
            console.log("Signup Success,", res.data);
        } catch(error){
            setErrors(['Something went wrong!'])
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
                            <div className={styles.buttonHoverBG}></div>
                        </div>
                    </div>
                </form>
                <div className={styles.loginLink}>
                    <span>Already have an account? <a>Login</a> </span>
                </div>
                {errors.length!=0 && <motion.div className={styles.errorsContainer}>
                    {errors.map(e=>{
                        return (
                            <div className={styles.error}>
                                <FontAwesomeIcon icon={faCircle} className={styles.errorCircle}></FontAwesomeIcon>
                                {e}
                            </div>
                            )}
                        )
                    }
                </motion.div>}
            </div>
            </div>
        </>
    )
}