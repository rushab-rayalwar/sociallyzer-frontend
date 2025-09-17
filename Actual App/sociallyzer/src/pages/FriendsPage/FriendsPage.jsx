//local imports
import styles from "./FriendsPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";

export default function FriendsPage(){
    return(
        <>
            <div className={styles.friendsPageContainer}>
                <div className={styles.background}>
                    {/* <header className={styles.header}>
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
                    </header> */}
                    <Header/>
                    <Navbar active="friends"/>
                    <section className={styles.body}>
                        <div className={styles.bodyHeader}>
                            <div className={styles.bodyTab}>
                                Requests
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}