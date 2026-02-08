// third party imports
import {motion, AnimatePresence} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// local imports
import styles from "./ToastNotification.module.css";

export default function ToastNotification({message}){
    const [isClosed, setIsClosed] = useState(false);
    return (
        <>
            <AnimatePresence mode="wait">
                {!isClosed && 
                    <motion.div className={styles.container} onClick={()=>setIsClosed(true)}
                    initial={{opacity:0, filter:"blur(0.4rem)", y:"1rem"}}
                    animate={{opacity:1, filter:"blur(0)", y:0}}
                    exit={{opacity:0, filter:"blur(0.4rem)", y:"1rem"}}
                    transition={{duration:0.5, }}
                    >
                        <div className={styles.content}>{message}</div>
                        <FontAwesomeIcon className={styles.closeIcon} icon={faXmark}/>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}