// library imports
import {motion} from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// local imports
import styles from "./PostDetailsPage.module.css";
import postPic from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import postOwnerPic from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import Comment from "../../components/Comment/Comment";


export default function PostDetailsPage(){
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
    return (
        <>
            <motion.div 
            className={styles.postDetailsContainer}
            initial={{ opacity:0, scale:1.1, filter:"blur(0.5rem)"}}
            animate={{opacity:1, scale:1, filter:"blur(0)"}}
            exit={{opacity:0, scale:0.9, filter:"blur(0.5rem)"}}
            transition={{duration:0.4, ease:"easeOut"}}
            >
                <div className={styles.postDetailsMain}>
                    <div className={styles.navButtons}>
                        <div className={styles.closeIcon} onClick={closePostDetails}>
                            <FontAwesomeIcon className={styles.xMark} icon={faXmark} />
                        </div>
                        <div className={styles.jumpToTop}></div>
                    </div>
                    <div className={styles.picture}>
                        <img src={postPic}></img>
                    </div>
                    <div className={styles.postInfo}>
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
                        <div className={styles.comments} >
                            <Comment name="Rakshit Devadiga"/>
                            <Comment name="Rohan Rayalwar"/>
                            <Comment name="Aditya Walture"/>
                            <Comment name="Vedant Gaikwad"/>
                            <Comment name="Rakshit Devadiga"/>
                            <Comment name="Rohan Rayalwar"/>
                            <Comment name="Aditya Walture"/>
                            <Comment name="Vedant Gaikwad"/>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}