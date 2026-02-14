// third party imports
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// local imports
import logoSVG from "../../assets/icons/logo.svg";
import styles from "./LandingPage.module.css";

export default function LandingPage(){ 
    const loginButton = useRef();
    const getStartedButton = useRef();
    const navigate = useNavigate();

    function gotoRegister(){
        console.log("Get Started Clicked");
        navigate("/register");
    }
    function gotoLogin(){
        console.log("Login Clicked");
        navigate("/login");
    }

    return(
        <>
        <div className={styles.background}>
            <motion.section className={styles.main}
            initial={{opacity:1, scale:1}}
            exit={{opacity:0, scale:0.5}}
            transition={{duration:0.3, ease:'easeOut'}}
            >
                <div className={styles.heading}>
                    <div className={styles.title}>
                        <span>
                            <img src={logoSVG} alt="logo"></img>
                            SOCIALLYZER
                        </span>
                    </div>
                    <h2 className={styles.tag}>Your Social Companion</h2>
                </div>
                <div className={`${styles.description} ${styles.preWhiteSpace}`}>Welcome to Sociallyzer!<br></br>
                Cut the noise, filter your feed,<br></br>
                and share with the people who matter.</div>
                <div className={styles.headingCtaButtons} style={{fontFamily: 'Poppins'}}>
                    <div className={`${styles.ctaButton} ${styles.login}`} ref={loginButton} onClick={gotoLogin}>
                        <div className={styles.glass} style={{borderRadius : "0.5rem"}}></div>
                        Login
                    </div> 
                    <div className={`${styles.ctaButton} ${styles.createAccount}`} ref={getStartedButton} onClick={gotoRegister}>

                        <div className={styles.glass} style={{bordeRadius : "0.5rem"}}></div>
                        <span>Get Started</span>
                        <img src={logoSVG}></img>
                        <div className={styles.buttonHoverBG}></div>
                        
                    </div>
                </div>
            </motion.section>
            </div>
        </>
    )
}