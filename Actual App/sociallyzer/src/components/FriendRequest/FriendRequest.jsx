//external imports
import { motion } from "framer-motion";

// local imports
import styles from "./FriendRequest.module.css";

export default function FriendRequest({name, friendsInCommon, enableBlur, handleHovering, handleHoveringStop, firstMount}){
    const variants = {
        hidden : {opacity:0, filter:'blur(0.3rem)', y:"30%"},
        firstMount : {opacity:1, filter:'blur(0)', y:"0"},
        switchToRightTab : {opacity:0, filter:'blur(0.3rem)', x:"-10%"},
        switchToLeftTab : {opacity:1, filter:'blur(0)', x:"0"}
    }
    return(
        <>
            <motion.div onMouseEnter={handleHovering} onMouseLeave={handleHoveringStop} className={enableBlur ? `${styles.blurCard} ${styles.friendRequest}` : `${styles.noBlurCard} ${styles.friendRequest}`} 
            variants={variants}
            transition={{opacity:{duration:0.4, ease:"easeOut"}, y:{duration:0.55, ease:"easeOut"}, x:{duration:0.55, ease:"easeOut"}, filter:{duration:0.3, ease:"easeOut"}}}
            >
                <div className={styles.left}>
                    <div className={styles.profilePic}>
                        <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="profile pic"/>
                    </div>
                    <div className={styles.nameAndMutuals}>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.mutuals}>{friendsInCommon} mutual friends</div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={`${styles.acceptButton} ${styles.button}`}>Accept</div>
                    <div className={`${styles.deleteButton} ${styles.button}`}>Delete</div>
                </div>
            </motion.div>
        </>
    )
}