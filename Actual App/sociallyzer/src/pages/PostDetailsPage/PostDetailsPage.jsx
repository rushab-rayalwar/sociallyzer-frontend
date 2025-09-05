// library imports
import {motion} from "framer-motion";
import { useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// local imports
import styles from "./PostDetailsPage.module.css";
import postPic from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";


export default function PostDetailsPage(){
    useEffect(()=>{
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden"; //NOTE : directly modifying DOM when using React is not encouraged as it might conflict with React's state management and result in unexpected behaviour
        // but this is a safe exception because the body element itself does not come under react components' tree
        return ()=>{
            document.body.style.overflow = originalStyle;
        }
    },[]);
    return (
        <>
            <motion.div className={styles.postDetailsContainer}
            initial={{ opacity:0, scale:0.9}}
            animate={{opacity:1, scale:1}}
            exit={{ opacity:0, scale:0.9}}
            transition={{duration:0.2, ease:"easeOut"}}
            >
                <div className={styles.postDetailsMain}>
                    <div className={styles.closeIcon}>
                        <FontAwesomeIcon className={styles.xMark} icon={faXmark} />
                    </div>
                    <div className={styles.picture}>
                        <img src={postPic}></img>
                    </div>
                </div>
            </motion.div>
        </>
    )
}