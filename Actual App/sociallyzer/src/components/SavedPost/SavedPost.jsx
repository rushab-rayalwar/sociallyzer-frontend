// external imports
import { AnimatePresence, motion, scale} from "framer-motion";
import { useEffect } from "react";

// local imports
import styles from "./SavedPost.module.css";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import postIMG2 from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import postIMG3 from "../../assets/dummyPosts/zdzszgh.png";

const variants = {
    hidden:{scale:0.97, opacity:0, filter:"blur(0.5rem)"},
    show:{scale:1, opacity:1, filter:"blur(0)"}
}


export default function SavedPost({imageNumber="1"}){
    useEffect(()=>{ //  without this, the scroll is not always at the top when we navigate to this page
        window.scrollTo(0,0);
    },[]);
    function getImageFromImageNumber(){
        let image = {
            "1" : postIMG1,
            "2" : postIMG2,
            "3" : postIMG3
        }
        return image[imageNumber];
    }
    return(
        <>
            <AnimatePresence>
                <motion.div className={styles.savedPost}
                variants={variants}
                transition={{opacity:{duration:0.7}, filter:{duration:0.35, ease:"easeOut"}, scale:{type:"spring", stiffness:70, damping:15}}}
                >
                    <img src={getImageFromImageNumber()}></img>
                    {/* <div className={styles.hoverOverlay}></div> */}
                </motion.div>
            </AnimatePresence>
        </>
    )
}