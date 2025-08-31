// external imports
import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faComment as commentSolidIcon } from "@fortawesome/free-solid-svg-icons";

// local imports
import styles from "./HomePage.module.css";
import FeedFilterOptions from "../../components/FeedFilterOptions/FeedFilterOptions.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import FriendSuggestions from "../../components/FriendSuggestions/FriendSuggestions.jsx";
import Post from "../../components/Post/Post.jsx";
import PostDetailsPage from "../PostDetailsPage/PostDetailsPage.jsx";

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
        }, 600);
    }
    return (
        <>
            <div className={styles.homePageContainer}>
                <div className={styles.background}>
                    <header className={styles.header}>
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
                    </header>
                    <Navbar/>
                    <FriendSuggestions/>
                    <section className={styles.feed}>
                        <div className={styles.prePosts}></div>
                        <div className={styles.posts}>
                            <Post/>
                            {/* <div className={styles.post}>
                                <div className={styles.postHeader}>
                                    <div className={styles.postInfo}>
                                        <div className={styles.userProfilePicContainer}>
                                            <img src={postIMG1} className={styles.userProfilePic}></img>
                                        </div>
                                        <div className={styles.postNameAndTime}>
                                            <span className={styles.postUserName}>Rushab Rayalwar</span>
                                            <span className={styles.timePosted}>03:30 Thursday 12/12/2025</span>
                                        </div>
                                    </div>
                                    <div className={styles.friendLevel}>
                                        <span>General   </span>
                                    </div>
                                </div>
                                <div className={styles.postPic}>
                                    <img src={postIMG1} className={styles.mainPic}></img>
                                    <img src={postIMG1} className={styles.shadowPic}></img>
                                </div>
                                <div className={styles.postFooter}>
                                    <div className={styles.postActions}>
                                        <div className={styles.likeAndComment}>
                                            <FontAwesomeIcon className={styles.postOption} icon={faThumbsUp}></FontAwesomeIcon>
                                            <FontAwesomeIcon className={styles.postOption} icon={faComment}></FontAwesomeIcon>
                                        </div>
                                        <div className={styles.bookmark}>
                                            <FontAwesomeIcon className={styles.postOption} icon={bookmarkRegular}></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className={styles.post}>
                                <div className={styles.postHeader}>
                                    <div className={styles.postInfo}>
                                        <div className={styles.userProfilePicContainer}>
                                            <img src={postIMG2} className={styles.userProfilePic}></img>
                                        </div>
                                        <div className={styles.postNameAndTime}>
                                            <span className={styles.postUserName}>Rohan Rayalwar</span>
                                            <span className={styles.timePosted}>22:34 Sunday 12/08/2025</span>
                                        </div>
                                    </div>
                                    <div className={styles.friendLevel}>
                                        <span>Close Friend</span>
                                    </div>
                                </div>
                                <div className={styles.postPic}>
                                    <img src={postIMG2} className={styles.mainPic}></img>
                                    <img src={postIMG2} className={styles.shadowPic}></img>
                                </div>
                                <div className={styles.postFooter}>
                                    <div className={styles.postActions}>
                                        <div className={styles.likeAndComment}>
                                            <FontAwesomeIcon className={styles.postOption} icon={faThumbsUp}></FontAwesomeIcon>
                                            <FontAwesomeIcon className={`${styles.postOption} ${styles.commentSolidIcon}`} icon={commentSolidIcon}></FontAwesomeIcon>
                                        </div>
                                        <div className={styles.bookmark}>
                                            <FontAwesomeIcon className={styles.postOption} icon={bookmarkRegular}></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className={styles.post}>
                                <div className={styles.postHeader}>
                                    <div className={styles.postInfo}>
                                        <div className={styles.userProfilePicContainer}>
                                            <img src={postIMG3} className={styles.userProfilePic}></img>
                                        </div>
                                        <div className={styles.postNameAndTime}>
                                            <span className={styles.postUserName}>Rohan Rayalwar</span>
                                            <span className={styles.timePosted}>22:34 Sunday 12/08/2025</span>
                                        </div>
                                    </div>
                                    <div className={styles.friendLevel}>
                                        <span>Inner Circle </span>
                                    </div>
                                </div>
                                <div className={styles.postPic}>
                                    <img src={postIMG3} className={styles.mainPic}></img>
                                    <img src={postIMG3} className={styles.shadowPic}></img>
                                </div>
                                <div className={styles.postFooter}>
                                    <div className={styles.postActions}>
                                        <div className={styles.likeAndComment}>
                                            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                                            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                                        </div>
                                        <div className={styles.bookmark}>
                                            <FontAwesomeIcon icon={bookmarkRegular}></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </section>
                    <footer className={styles.footer}>
                        <img src={filterIcon} className={styles.filterIcon} ref={filterIconRef} onMouseEnter={cursorEntered} onMouseLeave={cursorLeft}></img>
                        <AnimatePresence>
                            {visible && <FeedFilterOptions visible={visible} cursorLeft={cursorLeft} cursorEntered={cursorEntered}/>} {/* NOTE THIS */}
                        </AnimatePresence>
                    </footer>``
                </div>
                <div className={styles.postDetailsContainer}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}