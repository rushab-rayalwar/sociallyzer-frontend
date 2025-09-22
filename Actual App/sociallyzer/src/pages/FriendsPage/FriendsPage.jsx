//external imports
import {motion} from "framer-motion";
import { useState } from "react";

//local imports
import styles from "./FriendsPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import FriendRequest from "../../components/FriendRequest/FriendRequest";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";

export default function FriendsPage(){
    const [status, setStatus] = useState("left");
    return(
        <>
            <div className={styles.friendsPageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="friends"/>
                    <div className={styles.preBody}></div>
                    <motion.section className={styles.body}
                    initial={{opacity:0, y:50}}
                    animate={{opacity:1, y:0}}
                    transition={{type:"spring", stiffness:120, damping:10, mass:0.9}}
                    >
                        <div className={styles.bodyHeader}>
                            <div className={`${styles.bodyTabName} ${styles.selected}`}>
                                Manage Requests
                            </div>
                            <div className={styles.bodyTabName}>
                                Manage Friendships
                            </div>
                        </div>
                        <div className={styles.bodyMain}>
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                        </div>
                    </motion.section>
                </div>
            </div>
        </>
    )
}