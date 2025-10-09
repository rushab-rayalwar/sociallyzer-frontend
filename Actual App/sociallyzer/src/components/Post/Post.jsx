//third party imports
import { motion } from "framer-motion";

// local imports
import styles from "./Post.module.css";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";


export default function Post(){
    return(
        <>
            <motion.div className={styles.post}
            initial={{filter:"blur(0.5rem)", opacity:0, scale:0.97 }}
            animate={{filter:"blur(0)", opacity:1, scale:1}}
            transition={{
                opacity:{duration:0.2},
                blur:{duration:0.3}
            }}
            >
                <div className={styles.postHeader}>
                    <div className={styles.postInfo}>
                        <div className={styles.userProfilePicContainer}>
                            <img src={postIMG1} className={styles.userProfilePic}></img>
                        </div>
                        <div className={styles.postNameAndTime}>
                            <span className={styles.postUserName}>Rushab Rayalwar</span>
                            <span className={styles.timePosted}>03:30 Thursday 12/12/2025</span>
                        </div>
                    </div>
                    <div className={styles.friendLevel}>
                        <span>General   </span>
                    </div>
                </div>
                <div className={styles.postPic}>
                    <img src={postIMG1} className={styles.mainPic}></img>
                    <img src={postIMG1} className={styles.shadowPic}></img>
                </div>
                <div className={styles.postFooter}>
                    <div className={styles.postActions}>
                        <div className={styles.likeAndComment}>
                            <FontAwesomeIcon className={styles.postOption} icon={faThumbsUp}></FontAwesomeIcon>
                            <FontAwesomeIcon className={styles.postOption} icon={faComment}></FontAwesomeIcon>
                        </div>
                        <div className={styles.bookmark}>
                            <FontAwesomeIcon className={styles.postOption} icon={bookmarkRegular}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}