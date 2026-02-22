//external imports
import { motion } from "framer-motion";

// local imports
import styles from "./FriendInFindFriendsList.module.css";

export default function FriendInFindFriendsList({name, friendsInCommon, enableBlur, handleHovering, handleHoveringStop, firstMount, user}){
    const variants = {
        hidden : {opacity:0, filter:'blur(0.3rem)', y:"30%", x:'0', scale:1.04},
        firstMount : {opacity:1, filter:'blur(0)', y:"0", x:'0', scale:1},
        findFriends : {opacity:1, filter:'blur(0)', y:"0", x:'0', scale:1},
        requests : {opacity:0, filter:'blur(0.3rem)', y:"0", x:'-5%', scale:1},
        friendships : {opacity:0, filter:'blur(0.3rem)', y:"0", x:'-5%', scale:1}
    }
    return(
        <>
            <motion.div onMouseEnter={handleHovering} onMouseLeave={handleHoveringStop} className={enableBlur ? `${styles.blurCard} ${styles.friendRequest}` : `${styles.noBlurCard} ${styles.friendRequest}`} 
            variants={variants}
            transition={{scale:{duration:0.5, ease:"easeOut"}, opacity:{duration:0.5, ease:"easeOut"}, y:{ type:"spring", stiffness:50, damping:10}, x:{duration:0.5, ease:"easeOut"}, filter:{duration:0.5, ease:"easeOut"}}}
            >
                <div className={styles.left}>   
                    <div className={styles.profilePic}>
                        <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="profile pic"/>
                    </div   >
                    <div className={styles.nameAndMutuals}>
                        <div className={styles.name}>{user.name}</div>
                        <div className={styles.mutuals}>{friendsInCommon} mutual friends</div>
                    </div>
                </div>
                {/* <div className={styles.right}>
                    <div className={`${styles.acceptButton} ${styles.button}`}>Accept</div>
                    <div className={`${styles.deleteButton} ${styles.button}`}>Delete</div>
                </div> */}
            </motion.div>
        </>
    )
}