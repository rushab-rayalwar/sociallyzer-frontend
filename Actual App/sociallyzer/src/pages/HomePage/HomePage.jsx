// external imports
import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment as commentSolidIcon } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
//redux related imports
import { useSelector, useDispatch } from "react-redux";
import fetchFeedPosts from "../../redux/feedPosts/filterPostsThunk.js";

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
    const filterIconRef = useRef();

    const [visible, setVisible] = useState(false); // Controls the visibility of the FeedFilterOptions component
    const [widthOfFooter, setWidthOfFooter] = useState("fit-content");
    // const [posts, setPosts] = useState(null);
    const feedPostsState = useSelector(state=>state.feedPosts);
    const posts = feedPostsState.data;

    const location = useLocation();
    const dispatch = useDispatch(fetchFeedPosts);

    useEffect(()=>{
        if(posts.length == 0){
            dispatch(fetchFeedPosts());
        }
    },[dispatch]);

    function cursorEntered(){
        hovering.current = true;
        if(timeout) clearTimeout(timeout.current);
        setVisible(true);
        setWidthOfFooter("100%");
    }
    function cursorLeft(){
        hovering.current = false;
        timeout.current = setTimeout(()=>{
            if(!hovering.current){
                setVisible(false);
                setTimeout(()=>{ // NOTE : this delays the change in width of the footer to wait for the fade out animation
                    setWidthOfFooter("fit-content");
                },300);
            }
        }, 300);
    }
    return (
        <>
            <div className={styles.homePageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="home"/>
                    {/* <FriendSuggestions/> */}
                    <section className={styles.feed}>
                        <div className={styles.prePosts}></div>
                        <div className={styles.posts}>
                                {posts.length > 0 && !feedPostsState.loading &&
                                    posts.map(p=>{
                                        console.log("data sent to the post component", p);
                                        return <Post data={p} key={p._id}></Post>
                                    })
                                }
                                {/* {
                                    feedPostsState.loading && <div className={styles.loadingCard}>LOADING !</div>
                                } */}
                                <AnimatePresence mode="await">
                                    {feedPostsState.loading && <motion.div className={styles.loadingCard}
                                    initial={{opacity:0, y:"-10%"}}
                                    animate={{opacity:1, y:"0%"}}
                                    exit={{opacity:0, y:"-10%"}}
                                    transition={{duration:0.4, ease:"easeOut"}}
                                    >
                                        <div className={styles.loadingCardHeader}>
                                            <div className={styles.loading}>LOADING !</div>
                                            <div className={styles.loadingShadow}>LOADING !</div> {/* NOTE : This is to create the glow effect */}
                                        </div>
                                        
                                        <div className={styles.loadingCardBody}>
                                            Heads up! This app runs on a free hosting service, so the first request after inactivity might take a little longer while the server spins up. Subsequent requests will be much faster.
                                        </div>
                                    </motion.div>}
                                </AnimatePresence>
                        </div>
                    </section>
                    <footer className={styles.footer} style={{width : widthOfFooter}}>
                        <img src={filterIcon} className={styles.filterIcon} ref={filterIconRef} onMouseEnter={cursorEntered} onMouseLeave={cursorLeft}></img>
                        <AnimatePresence>
                            {visible && <FeedFilterOptions visible={visible} cursorLeft={cursorLeft} cursorEntered={cursorEntered}/>} {/* NOTE THIS */}
                        </AnimatePresence>
                    </footer>
                </div>
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname}/> {/* NOTE: Providing key={location.key} is necessary because Framer Motion's AnimatePresence component needs a changing key to detect that a child component has been replaced. Without a changing key, AnimatePresence won't recognize the route change as a trigger for the exit and entry animations*/}
                </AnimatePresence>
            </div>
        </>
    )
}