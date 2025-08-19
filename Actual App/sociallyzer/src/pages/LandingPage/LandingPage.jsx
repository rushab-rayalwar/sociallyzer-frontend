// third party imports
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

// local imports
import logoSVG from "../../assets/icons/logo.svg";
import styles from "./LandingPage.module.css";
import animations from "./LandingPageAnimations.module.css";


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
        useNavigate("/login");
    }

    return(
        <>
            <section className={styles.main}>
                <div className={styles.heading}>
                    <h1 className={styles.title}>
                        <span>
                            <img src={logoSVG} alt="logo"></img>
                            SOCIALLYZER
                        </span>
                    </h1>
                    <h2 className={styles.tag}>Your Social Companion</h2>
                </div>
                <div className={`${styles.description} ${styles.preWhiteSpace}`}>Welcome to Sociallyzer!<br></br>
                Cut the noise, filter your feed,<br></br>
                and share with the people who matter.</div>
                <div className={styles.headingCtaButtons} style={{fontFamily: 'Poppins'}}>
                    <div className={`${styles.ctaButton} ${styles.login}`} ref={loginButton}>
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
            </section>
        </>
    )
}