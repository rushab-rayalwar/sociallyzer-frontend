// third party imports
import {motion} from "framer-motion";

// local imports
import styles from "./ToastNotification.module.css";

export default function ToastNotification({message}){
    return (
        <>
            <motion.div className={styles.container}
            initial={{opacity:0, filter:"blur(0.4rem)", y:"1rem"}}
            animate={{opacity:1, filter:"blur(0)", y:0}}
            transition={{duration:0.5, }}
            >
                <div className={styles.content}>{message}</div>
            </motion.div>
        </>
    )
}