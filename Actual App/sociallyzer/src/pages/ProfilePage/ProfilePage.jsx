// third party imports
import {motion} from "framer-motion";
import { useState } from "react";

// local imports
import Navbar from "../../components/Navbar/Navbar.jsx";
import Header from "../../components/Header/Header.jsx";
import styles from "./ProfilePage.module.css";
import image from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import PostInAGrid from "../../components/PostInGrid/PostInAGrid.jsx";

export default function ProfilePage(){

    const [hoveringOver, setHoveringOver] = useState(null);

    const variants = {
        hidden:{},
        show:{ transition:{staggerChild:0.05} },
        hoveringOverAChild:{ opacity:1 }
    }

    return(
        <>
            <div className={styles.profilePageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="profile"/>
                    <motion.section className={styles.profilePageSection}
                    initial={{opacity:0, filter:"blur(0.3rem)"}}
                    animate={{opacity:1, filter:"blur(0)"}}
                    >
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
                                    <div className={styles.editProfileButtonContainer}>
                                        <div className={styles.editProfileButton}>Edit Profile</div>
                                    </div>    
                                </div>
                            </div>
                            <div className={styles.divider}></div>
                            <motion.div className={styles.posts}
                            variants={variants}
                            initial="hidden"
                            animate={hoveringOver == null ? "show" : "hoveringOverAChild"}
                            >
                                {Array.from({length:15},(_, index)=>{
                                    let imageNumber = Math.floor(Math.random()*3) + 1;
                                    return (
                                        <PostInAGrid imageNumber={imageNumber} key={index} id={index} hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(index)}></PostInAGrid>
                                    )
                                })}
                            </motion.div>
                        </div>
                    </motion.section>
                </div>
            </div>
        </>
    )
}