// external imports
import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment as commentSolidIcon } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
    const [posts, setPosts] = useState(null);

    const location = useLocation();
    

    useEffect(()=>{ // NOTE THIS : the callback function here cannot be async as async functions always return a promise. The callback function of useEffect is expected to either return a cleanup function or nothing
        getPosts().then(data=>{
            setPosts(data.data); // data is the Object received from the backend and the .data property contains the data about the posts
        }).catch(error=>{
            let backendErrors = error.response?.data?.errors || ["Something went wrong"];
            console.log("ERROR LOADING POSTS", error);
        });
    },[]);

    async function getPosts(){
        let res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/feed/",{withCredentials:true});
        let data = res.data;
        return data;
    }

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
                    {/* <FriendSuggestions/> */}
                    <section className={styles.feed}>
                        <div className={styles.prePosts}></div>
                        <div className={styles.posts}>
                                {posts &&
                                    posts.map(p=>{
                                        console.log("data sent to the post component", p);
                                        return <Post data={p}></Post>
                                    })
                                }
                        </div>
                    </section>
                    <footer className={styles.footer}>
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