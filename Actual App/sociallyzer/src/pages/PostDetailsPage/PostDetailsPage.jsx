// library imports
import {motion} from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// local imports
import styles from "./PostDetailsPage.module.css";
import postPic from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import postOwnerPic from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";


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
            <motion.div className={styles.postDetailsContainer}
            initial={{ opacity:0, scale:1.1}}
            animate={{opacity:1, scale:1}}
            exit={{ opacity:0, scale:1.1}}
            transition={{duration:0.3, ease:"easeOut"}}
            >
                <div className={styles.postDetailsMain}>
                    <div className={styles.closeIcon} onClick={closePostDetails}>
                        <FontAwesomeIcon className={styles.xMark} icon={faXmark} />
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
                    </div>
                </div>
            </motion.div>
        </>
    )
}