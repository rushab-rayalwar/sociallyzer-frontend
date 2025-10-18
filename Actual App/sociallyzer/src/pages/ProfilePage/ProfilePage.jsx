// third party imports
import Navbar from "../../components/Navbar/Navbar.jsx";
import Header from "../../components/Header/Header.jsx";

// local imports
import styles from "./ProfilePage.module.css";
import image from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";

export default function ProfilePage(){
    return(
        <>
            <div className={styles.profilePageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="profile"/>
                    <section className={styles.profilePageSection}>
                        <div className={styles.marginAtTop}></div>
                        <div className={styles.profilePage}>
                            <div className={styles.pageHeader}>
                                <div className={styles.profilePicSection}>
                                    <img src={image}></img>
                                </div>
                                <div className={styles.profileInfoSection}>
                                    <div className={styles.userName}>
                                        Rushab Rayalwar
                                    </div>
                                    <div className={styles.profileInfo}>
                                        <span>10 Posts</span> <span>100 Friends</span>
                                    </div>
                                    <div className={styles.userBio}>
                                        Just another curious soul trying to make sense of this chaotic, beautiful world. Music, movies, and random midnight thoughts — that’s my kind of therapy. Just another curious soul trying to make sense of this chaotic, beautiful world. Music, movies, and random midnight thoughts — that’s my kind of therapy.
                                    </div>                                        
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}