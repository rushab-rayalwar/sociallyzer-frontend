// external imports
import { AnimatePresence, motion, scale} from "framer-motion";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// local imports
import styles from "./SavedPost.module.css";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import postIMG2 from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import postIMG3 from "../../assets/dummyPosts/zdzszgh.png";

export default function SavedPost({imageNumber="1", mouseEnter, mouseLeave, hoveringOver, id}){ // VERY IMPORTANT NOTE : Please study the staggering and hovering logic in the parent component (SavedPostsPage)
    
    const navigate = useNavigate();

    useEffect(()=>{ //  without this, the scroll is not always at the top when we navigate to this page
        window.scrollTo(0,0);
    },[]);

    const variants = {
        hidden:{scale:0.97, opacity:0, filter:"blur(0.5rem)"},
        show:{scale:1, opacity:1, filter:"blur(0)"},
        hoveringOverAChild:{ filter: ((hoveringOver == null || hoveringOver == id) ? "blur(0) drop-shadow(0 0 0.8rem rgba(0,0,0,0.8))" : "blur(0.1rem)"), scale:(hoveringOver == id ? 1.03 : 1), opacity:1, transition:{scale:{type:"spring", stiffness:100, damping:15}}},
    }

    function getImageFromImageNumber(){ // this is only for demo purposes
        let image = {
            "1" : postIMG1,
            "2" : postIMG2,
            "3" : postIMG3
        }
        return image[imageNumber];
    }

    function getClassNames(){
        let className = `${styles.savedPost} ${styles.notHoveredOver}`;
        if( Number(hoveringOver) === Number(id) ) className = `${styles.savedPost} ${styles.hoveredOver}`;
        return className;
    }
    return(
        <>
            <AnimatePresence>
                <motion.div className={getClassNames()} onMouseLeave={mouseLeave} onMouseEnter={mouseEnter} // NOTE : in the className prop, the function itself is called directly . This ensures the className gets correct values on every render.
                variants={variants}
                transition={{opacity:{duration:0.7}, filter:{duration:0.35, ease:"easeInOut"}, scale:{type:"spring", stiffness:70, damping:15}}}

                onClick={()=>navigate(id)}
                >
                    <img src={getImageFromImageNumber()} ></img>
                <div className={styles.overlay}>
                    <div className={styles.overlayFooter}>
                        <div className={styles.postOwnerName}>Rushab Rayalwar</div>
                        <div className={styles.postInfo}>
                            <FontAwesomeIcon icon={faThumbsUp} className={styles.faIcon}></FontAwesomeIcon><span> 32</span>
                            <FontAwesomeIcon icon={faComment} className={styles.faIcon}></FontAwesomeIcon><span> 10</span>
                        </div>
                    </div>
                </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}