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


// NOTE : VERY IMPORTANT the animation logic for staggered animations
export default function FriendsPage(){
    const [tab, setTab] = useState("left");
    const [hoveringOver, setHoveringOver] = useState(null); //  flag to check which card is being hovered over

    const [containerState, setContainerState] = useState('hidden');

    function switchToLeftTab(){
        setContainerState('left');
        setTab('left');
    }
    function switchToRightTab(){
        setContainerState('right');
        setTab('right');
    }

    useEffect(()=>{
        setContainerState('firstMount');
    }, []);

    useEffect(()=>{ // this is only for debugging purposes
        console.log('Container State', containerState);
        console.log('Tab', tab);
        console.log('.');
    },[containerState]);

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
            transition:{staggerChildren:0.1, delayChildren:0, duration:0.1, ease:"easeOut"}
        },
        right: {
            opacity : 1,
            transition:{staggerChildren:0.1, delayChildren:0.1, duration:0.1, ease:"easeOut"}
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
                            {users.map((f,i)=>{
                                return (
                                    <FriendRequest name={f} friendsInCommon='5' key={i} enableBlur={(hoveringOver==i || hoveringOver==null) ? false : true} handleHovering={()=>setHoveringOver(i.toString())} handleHoveringStop={()=>setHoveringOver(null)} />
                                )
                            })}                            
                        </motion.div>}
                        {tab=="right" && <motion.div className={`${styles.bodyMain} ${styles.friendships}`}
                        variants = {containerVariants}
                        initial = {containerState == 'right' ? 'left' : 'right'}
                        animate = {containerState}
                        >
                            {users.map((f,i)=>{
                                return (
                                    <FriendshipCard name={f} friendsInCommon='5' key={i} enableBlur={(hoveringOver==i || hoveringOver==null) ? false : true} handleHovering={()=>setHoveringOver(i.toString())} handleHoveringStop={()=>setHoveringOver(null)} />
                                )
                            })}
                        </motion.div>}
                    </motion.section>
                </div>
            </div>
        </>
    )
}