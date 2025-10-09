// external imports
import { AnimatePresence, motion, scale} from "framer-motion";

// local imports
import styles from "./SavedPost.module.css";

export default function SavedPost(){
    return(
        <>
            <AnimatePresence>
                <motion.div className={styles.savedPost}
                initial={{scale:0.97, opacity:0, filter:"blur(0.5rem)"}}
                animate={{scale:1, opacity:1, filter:"blur(0)"}}
                transition={{opacity:{duration:0.2}, blur:{duration:0.5, ease:"easeOut"}}}
                >

                </motion.div>
            </AnimatePresence>
        </>
    )
}