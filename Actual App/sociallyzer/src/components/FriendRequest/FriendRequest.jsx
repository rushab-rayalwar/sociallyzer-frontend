//external imports
import { motion } from "framer-motion";

// local imports
import styles from "./FriendRequest.module.css";

export default function FriendRequest({name, friendsInCommon, enableBlur, handleHovering, handleHoveringStop}){
    const variants = {
        hidden:{
            opacity:0,
            y: "+30%"
        },
        visible:{
            opacity:1,
            y: "0"
        }
    }
    return(
        <>
            <motion.div className={enableBlur ? `${styles.blurCard} ${styles.friendRequest}` : `${styles.noBlurCard} ${styles.friendRequest}`} onMouseEnter={handleHovering} onMouseLeave={handleHoveringStop}
            variants={variants}
            transition={{duration:0.65}}
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