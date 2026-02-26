// external imports
import { useEffect } from "react";
import { useSelector } from "react-redux";

// local imports
import styles from "./Header.module.css";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";

export default function Header(){
    const user = useSelector(state=>state.user);
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
                        <img src={user.profilePic || "https://res.cloudinary.com/dgk58bntg/image/upload/v1771784138/dcddc_oq2qeo.jpg"} className={styles.userProfilePic}></img>
                    </div>
                    <span>{user.name}</span>
                </div>
            </header>
        </>
    )
}