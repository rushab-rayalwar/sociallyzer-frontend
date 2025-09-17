// library imports
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowUp, faThumbsUp, faComment, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as thumbsUpHollow } from "@fortawesome/free-regular-svg-icons";
import { AnimatePresence } from "framer-motion";

// local imports
import styles from "./PostDetailsPage.module.css";
import postPic from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import postOwnerPic from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import Comment from "../../components/Comment/Comment";


export default function PostDetailsPage(){

    const postInfo = useRef();
    const [arrowIsVisible, setArrowIsVisible] = useState(false);

    useEffect(()=>{
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden"; //NOTE : directly modifying DOM when using React is not encouraged as it might conflict with React's state management and result in unexpected behaviour
        // but this is a safe exception because the body element itself does not come under react components' tree
        return ()=>{
            document.body.style.overflow = originalStyle;
        }
    },[]);

    const navigate = useNavigate();

    function closePostDetails(){
        navigate(-1);
    }
    function jumpToTopCommnent(){
        // postInfo.current.scrollTop = "0";  NOTE THIS
        postInfo.current.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }
    function handleScrollButtonVisibility(){
        if(postInfo.current.scrollTop > 0){
            setArrowIsVisible(true);
        } else {
            setArrowIsVisible(false);
        }
    }

    return (
        <>
            <motion.div 
            className={styles.postDetailsContainer}
            initial={{ opacity:1, scale:1.1, filter:"blur(0.5rem)"}}
            animate={{opacity:1, scale:1, filter:"blur(0)"}}
            transition={{duration:0.4, ease:"easeOut"}}
            >
                <div className={styles.postDetailsMain}>
                    <div className={styles.navButtons}>
                        <div className={styles.navButton} onClick={closePostDetails}>
                            <FontAwesomeIcon className={styles.xMark} icon={faXmark} />
                        </div>
                        <div className={styles.navButton}>
                            <FontAwesomeIcon className={styles.bookmark} icon={faBookmark} />
                        </div>
                        <AnimatePresence>
                            {arrowIsVisible && 
                                <motion.div className={styles.navButton} onClick={jumpToTopCommnent}
                                initial={{ opacity:0, filter:"blur(0.3rem)"}}
                                animate={{opacity:1, filter:"blur(0)"}}
                                exit={{opacity:0, filter:"blur(0.3rem)"}}
                                transition={{duration:0.3, ease:"easeInOut"}}
                                >
                                    <FontAwesomeIcon className={styles.arrowUp} icon={faArrowUp}></FontAwesomeIcon>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                    <div className={styles.picture}>
                        <img src={postPic}></img>
                    </div>
                    <div className={styles.postInfo} ref={postInfo} onScroll={handleScrollButtonVisibility}>
                        <div className={styles.postInfoHeader}>
                            <div className={styles.postOwnerPic}>
                                <img src={postOwnerPic} className={styles.postOwnerPic}></img>
                            </div>
                            <div className={styles.postOwnerDetails}>
                                <span className={styles.postOwnerName}>Rushab Rayalwar </span>
                                <div className={styles.dot}></div>
                                <span className={styles.postOwnerFriendType}>General</span>
                            </div>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.postInfoBody}>
                            <div className={styles.postDescriptionContainer}>
                                The quick brown fox jumps over the lazy dog. This sentence is used to test typing skills and a font's legibility because it contains every letter of the alphabet. It's a classic example of a pangram, a sentence that uses every letter at least once.
                            </div>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.userActionsContainer}>
                            <div className={styles.likesAndCommentsNumbers}>
                                <div className={styles.number}>
                                    <FontAwesomeIcon icon={faThumbsUp} className={styles.numberIcon}></FontAwesomeIcon>
                                    <span>34 Likes</span>
                                </div>
                                <div className={styles.number}>
                                    <FontAwesomeIcon icon={faComment} className={styles.numberIcon}></FontAwesomeIcon>
                                    <span>10 Comments</span>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <FontAwesomeIcon icon={thumbsUpHollow} className={styles.thumbsUpHollow}></FontAwesomeIcon>
                                <textarea type="text" placeholder="Write a comment..." className={styles.commentInput}></textarea>
                                <div className={styles.postCommentButton}>Post</div>
                            </div>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.comments} >
                            <Comment name="John Doe"/>
                            <Comment name="Rohan Rayalwar"/>
                            <Comment name="XYZ ABC"/>
                            <Comment name="Abcd Efgh"/>
                            <Comment name="John Doe"/>
                            <Comment name="Rohan Rayalwar"/>
                            <Comment name="XYZ ABC"/>
                            <Comment name="Abcd Efgh"/>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}