//external imports
import {motion} from "framer-motion";
import { useState, useEffect } from "react";

//local imports
import styles from "./FriendsPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import FriendshipCard from "../../components/FriendshipCard/FriendshipCard";
import FriendInFindFriendsList from "../../components/FriendInFindFriendsList/FriendInFindFriendsList";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import { current } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// NOTE : VERY IMPORTANT - study the animation logic for staggered animations
export default function FriendsPage(){
    
    const [tab, setTab] = useState("findFriends"); // findFriends - requests - friendships
    const [prevTab, setPrevTab] = useState("hidden");
    const [focus, setFocus] = useState(null); //  Represents the list item under focus, in the friendships tab. An element is under focus when the user clicks on the dropdown menu of that element
    const [containerState, setContainerState] = useState('xchidden');

    useEffect(()=>{
        setContainerState('firstMount');
    }, []);

    function toggleFocus(id){
        if(id === focus) setFocus(null);
        else setFocus(id);
    }
    function switchToRequests(){
        setFocus(null);
        setPrevTab(tab);
        setContainerState('requests');
        setTab('requests');
    }
    function switchToFriendships(){
        setFocus(null);
        setPrevTab(tab);
        setContainerState('friendships');
        setTab('friendships');
    }
    function switchToFindFriends(){
        setFocus(null);
        setPrevTab(tab);
        setContainerState('findFriends');
        setTab('findFriends');
    }

    const containerVariants = { //  these variants apply to both the requests container and the friendships container
        hidden : {
            opacity : 0
        },
        firstMount: { // this  variant is applied only for the first mount of the requests tab
            opacity : 1,
            transition:{staggerChildren:0.1, delayChildren:0, duration:0.1, ease:"easeOut"}
        },
        findFriends: {
            opacity : 1,
            transition:{staggerChildren:0.08, delayChildren:0.1, duration:0.1, ease:"easeOut"}
        },
        requests: {
            opacity : 1,
            transition:{staggerChildren:0.08, delayChildren:0.1, duration:0.1, ease:"easeOut"}
        },
        friendships: {
            opacity : 1,
            transition:{staggerChildren:0.08, delayChildren:0.1, duration:0.1, ease:"easeOut"}
        }
    }
    const users = ["Rohan Rayalwar", "Sheetal Rayalwar", "John Doe", "Shourya Rayalwar", "Gourang Rayalwar", "Aditya Walture", "Pratik Kurhe", "Yuvraj Rathore", "Ravi Rathore"];
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
                            <div className={tab=="findFriends" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>switchToFindFriends()}>
                                Find Friends
                            </div>
                            <div className={tab=="requests" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>switchToRequests()}>
                                Manage Requests 
                            </div>
                            <div className={tab=="friendships" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>switchToFriendships()}>
                                Manage Friendships
                            </div>
                        </div>
                        {tab=="findFriends" && <motion.div className={`${styles.bodyMain} ${styles.findFriends}`}
                        variants = {containerVariants}
                        initial = {containerState == "hidden" ? "hidden" : prevTab} // NOTE
                        animate = {containerState}
                        >
                            <div className={styles.searchBar}>
                                <input type="text" placeholder="Search" />
                                <div className={styles.searchBarIconContainer}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchBarIcon}/>
                                </div>
                            </div>
                            <div className={styles.divider}></div>
                            {users.map((u,i)=>{
                                return (
                                    <FriendInFindFriendsList name={u} friendsInCommon='5' key={i} />
                                )
                            })}                            
                        </motion.div>}
                        {tab=="requests" && <motion.div className={`${styles.bodyMain} ${styles.requests}`}
                        variants = {containerVariants}
                        initial = {containerState == "hidden" ? "hidden" : prevTab} // NOTE
                        animate = {containerState}
                        >
                            {users.map((u,i)=>{
                                return (
                                    <FriendRequest name={u} friendsInCommon='5' key={i} />
                                )
                            })}                            
                        </motion.div>}
                        {tab=="friendships" && <motion.div className={`${styles.bodyMain} ${styles.friendships}`}
                        variants = {containerVariants}
                        initial = {containerState == "hidden" ? "hidden" : prevTab}
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