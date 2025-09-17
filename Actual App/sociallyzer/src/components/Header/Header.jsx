// local imports
import styles from "./Header.module.css";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";

export default function Header(){
    return(
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.title}>
                        <span>
                            <img src={icon} alt="logo"></img>
                            SOCIALLYZER
                        </span>
                    </div>
                </div>
                <div className={styles.userName}>
                    <div className={styles.userProfilePicContainer}>
                        <img src={postIMG1} className={styles.userProfilePic}></img>
                    </div>
                    <span>Rushab Rayalwar</span>
                </div>
            </header>
        </>
    )
}