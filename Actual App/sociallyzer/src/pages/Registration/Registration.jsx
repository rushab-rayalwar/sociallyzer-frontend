
// local imports
import logoSVG from "../../assets/icons/logo.svg";
import styles from "./Registration.module.css";

export default function Registration(){
    return(
        <>
            <div className={styles.main}>
                <div className={styles.title}>
                    <img src={logoSVG} alt="logo"></img>
                    <span>SOCIALLYZER</span>
                </div>
                <form className={styles.glass}>
                    <div className={styles.formElement}>
                        <div className={`${styles.field} ${styles.name}`}>
                            <label for="name">Name</label>
                            <input type="string" name="name" placeholder="John Doe"></input>
                        </div>
                        <div className={`${styles.field} ${styles.email}`}>
                            <label for="email">Email</label>
                            <input type="string" name="email" placeholder="johndoe@xyz.com"></input>
                        </div>
                        <div className={`${styles.field} ${styles.password}`}>
                            <label for="password">Password</label>
                            <input type="password" name="password" placeholder="Password Here"></input>
                        </div>
                        <div className={styles.submitButton}>
                            <span>Register</span>
                        
                            <div className="buttonHoverBG"></div>
                        </div>
                    </div>
                </form>
                <div className={styles.loginLink}>
                    <span>Already have an account? <a>Login</a> </span>
                </div>
            </div>
        </>
    )
}