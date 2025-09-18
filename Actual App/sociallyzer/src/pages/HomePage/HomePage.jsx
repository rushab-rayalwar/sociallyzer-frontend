// external imports
import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment as commentSolidIcon } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

// local imports
import styles from "./HomePage.module.css";
import FeedFilterOptions from "../../components/FeedFilterOptions/FeedFilterOptions.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import FriendSuggestions from "../../components/FriendSuggestions/FriendSuggestions.jsx";
import Post from "../../components/Post/Post.jsx";
import PostDetailsPage from "../PostDetailsPage/PostDetailsPage.jsx";
import Header from "../../components/Header/Header.jsx";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import postIMG2 from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import postIMG3 from "../../assets/dummyPosts/zdzszgh.png";
import filterIcon from "../../assets/icons/filter.svg";


export default function HomePage(){ // NOTE the state logic here
    const hovering = useRef(false);
    const timeout = useRef(null);
    const [visible, setVisible] = useState(false);

    const location = useLocation();
    
    const filterIconRef = useRef();

    function cursorEntered(){
        hovering.current = true;
        if(timeout) clearTimeout(timeout.current);
        setVisible(true);
    }
    function cursorLeft(){
        hovering.current = false;
        timeout.current = setTimeout(()=>{
            if(!hovering.current){
                setVisible(false);
            }
        }, 300);
    }
    return (
        <>
            <div className={styles.homePageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="home"/>
                    <FriendSuggestions/>
                    <section className={styles.feed}>
                        <div className={styles.prePosts}></div>
                        <div className={styles.posts}>
                                <Post/>
                                <Post/>
                                <Post/>
                        </div>
                    </section>
                    <footer className={styles.footer}>
                        <img src={filterIcon} className={styles.filterIcon} ref={filterIconRef} onMouseEnter={cursorEntered} onMouseLeave={cursorLeft}></img>
                        <AnimatePresence>
                            {visible && <FeedFilterOptions visible={visible} cursorLeft={cursorLeft} cursorEntered={cursorEntered}/>} {/* NOTE THIS */}
                        </AnimatePresence>
                    </footer>``
                </div>
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname}/> {/* NOTE: Providing key={location.key} is necessary because Framer Motion's AnimatePresence component needs a changing key to detect that a child component has been replaced. Without a changing key, AnimatePresence won't recognize the route change as a trigger for the exit and entry animations*/}
                </AnimatePresence>
            </div>
        </>
    )
}