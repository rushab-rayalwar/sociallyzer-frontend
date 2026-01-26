//third party imports
import { motion } from "framer-motion";
import { useState } from "react";

// local imports
import styles from "./Post.module.css";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp as thumbRegular, faComment as commentRegular, faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as thumbSolid, faComment as commentSolid, faBookmark as bookmarkSolid} from "@fortawesome/free-solid-svg-icons";


function formatTime(dateInput) {
    const date = new Date(dateInput);
  
    const time = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(date);
  
    const day = new Intl.DateTimeFormat("en-IN", {
      weekday: "long"
    }).format(date);
  
    const datePart = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  
    return `${time} ${day} ${datePart}`;
}

export default function Post({data}){ // if the visibility field is not present in the data fetched from the backend, the Post is visible to the user. Information about the visibility of a post is provided only to the owner of the post
    let {userId, userName, content, image=null, likesCount, commentsCount, recentComment, visibility="visible", createdAt} = data;
    let formattedTimeOfCreation = formatTime(createdAt);

    const [options, setOptions] = useState(
        {
            liked : false,
            commented : false,
            saved : false
        }
    );

    function handleClick(option){
        switch(option) {
            case "like" :
                setOptions(options=>{
                    return {...options, liked : !options.liked}
                });
                break;
            case "comment" :
                setOptions(options=>{
                    return {...options, commented : !options.commented}
                });
                break;
            case "save" :
                setOptions(options=>{
                    return {...options, saved : !options.saved}
                });
                break;
        }
    }

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
                            <span className={styles.postUserName}>{userName}</span>
                            <span className={styles.timePosted}>{formattedTimeOfCreation}</span>
                        </div>
                    </div>
                    <div className={styles.friendLevel}>
                        <span>General   </span>
                    </div>
                </div>
                {/* <div className={styles.postPic}>
                    <img src={postIMG1} className={styles.mainPic}></img>
                    <img src={postIMG1} className={styles.shadowPic}></img>
                </div> */}
                <div className={styles.postPic}>
                    <img src={image.url} className={styles.mainPic}></img>
                    <img src={image.url} className={styles.shadowPic}></img>
                </div>
                <div className={styles.postFooter}>
                    <div className={styles.postContent}>
                        {content}
                    </div>
                    <div className={styles.postActions}>
                        <div className={styles.likeAndComment}>
                            <div className={styles.like} onClick={()=>handleClick("like")}>
                                <div className={styles.likesCount}>{likesCount}</div>
                                {
                                !options.liked ? 
                                <FontAwesomeIcon className={styles.postOption} icon={thumbRegular}></FontAwesomeIcon>
                                : <FontAwesomeIcon className={styles.postOption} icon={thumbSolid}></FontAwesomeIcon>
                                }
                            </div>
                            <div className={styles.comment} onClick={()=>handleClick("comment")}>
                                <div className={styles.commentsCount}>{commentsCount}</div>
                                {
                                !options.commented ? 
                                <FontAwesomeIcon className={styles.postOption} icon={commentRegular}></FontAwesomeIcon>
                                : <FontAwesomeIcon className={styles.postOption} icon={commentSolid}></FontAwesomeIcon>
                                }
                            </div>
                        </div>
                        <div className={styles.bookmark} onClick={()=>handleClick("save")}>
                                {
                                !options.saved ? 
                                <FontAwesomeIcon className={styles.postOption} icon={bookmarkRegular}></FontAwesomeIcon>
                                : <FontAwesomeIcon className={styles.postOption} icon={bookmarkSolid}></FontAwesomeIcon>
                                }
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

// open sans