//external imports
import {motion} from "framer-motion";
import { useState, useEffect } from "react";

//local imports
import styles from "./FriendsPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import FriendshipCard from "../../components/FriendshipCard/FriendshipCard";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import { current } from "@reduxjs/toolkit";


// NOTE : VERY IMPORTANT - study the animation logic for staggered animations
export default function FriendsPage(){
    
    const [tab, setTab] = useState("left");
    const [focus, setFocus] = useState(null); //  Represents the list item under focus, in the friendships tab. An element is under focus when the user clicks on the dropdown menu of that element
    const [containerState, setContainerState] = useState('hidden');

    useEffect(()=>{
        setContainerState('firstMount');
    }, []);

    function toggleFocus(id){
        if(id === focus) setFocus(null);
        else setFocus(id);
    }
    function switchToLeftTab(){
        setFocus(null);
        setContainerState('left');
        setTab('left');
    }
    function switchToRightTab(){
        setFocus(null);
        setContainerState('right');
        setTab('right');
    }


    const containerVariants = { //  these variants apply to both the requests container and the friendships container
        hidden : {
            opacity : 0
        },
        firstMount: { // this  variant is applied only for the first mount of the left tab
            opacity : 1,
            transition:{staggerChildren:0.1, delayChildren:0, duration:0.1, ease:"easeOut"}
        },
        left: {
            opacity : 1,
            transition:{staggerChildren:0.05, duration:0.1, ease:"easeOut"}
        },
        right: {
            opacity : 1,
            transition:{staggerChildren:0.05, duration:0.1, ease:"easeOut"}
        }
    }
    const users = ["Rohan Rayalwar", "Sheetal Rayalwar", "Tatya Vinchu", "Shourya Rayalwar", "Gourang Rayalwar", "Aditya Walture", "Pratik Kurhe", "Yuvraj Rathore", "Ravi Rathore"];
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
                    transition={{type:"spring", stiffness:120, damping:15, mass:0.9}}
                    >
                        <div className={styles.bodyHeader}>
                            <div className={tab=="left" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>switchToLeftTab()}>
                                Manage Requests 
                            </div>
                            <div className={tab=="right" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>switchToRightTab()}>
                                Manage Friendships
                            </div>
                        </div>
                        {tab=="left" && <motion.div className={`${styles.bodyMain} ${styles.requests}`}
                        variants = {containerVariants}
                        initial = {containerState == "hidden" ? "hidden" : "right"} // NOTE
                        animate = {containerState}
                        >
                            {users.map((u,i)=>{
                                return (
                                    <FriendRequest name={u} friendsInCommon='5' key={i} />
                                )
                            })}                            
                        </motion.div>}
                        {tab=="right" && <motion.div className={`${styles.bodyMain} ${styles.friendships}`}
                        variants = {containerVariants}
                        initial = {containerState == 'right' ? 'left' : 'right'}
                        animate = {containerState}
                        >
                            {users.map((u,i)=>{
                                return (
                                    <FriendshipCard name={u} friendsInCommon='5' key={i} enableBlur={ (focus == null || focus == i) ? false : true} toggleFocus={toggleFocus} focus={focus} id={i}/>
                                )
                            })}
                        </motion.div>}
                    </motion.section>
                </div>
            </div>
        </>
    )
}