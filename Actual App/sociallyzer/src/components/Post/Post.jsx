//third party imports
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// local imports
import styles from "./Post.module.css";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp as thumbRegular, faComment as commentRegular, faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as thumbSolid, faComment as commentSolid, faBookmark as bookmarkSolid} from "@fortawesome/free-solid-svg-icons";
// redux related imports
import { likeToggled, saveToggled } from "../../redux/features/posts/postActions.js";
import { toggleSavedPostInSavedPostSliceOptimistic } from "../../redux/features/savedPostsSlice/savedPostsSlice.js";

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
    let {userId, userName, content, image=null, likesCount, commentsCount, recentComment, visibility="visible", createdAt, _id, isLiked, isBookmarked} = data;
    let formattedTimeOfCreation = formatTime(createdAt);

    const [isSaving, setIsSaving] = useState(false); // NOTE THIS : these flags avoid sending requests when a similar request already mid flight
    const [isLiking, setIsLiking] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClick(option){
        switch(option) {
            case "like" :
                if(!isLiking) requestToggleLike();
                break;
            case "comment" :
                navigate("/home/"+_id);
                break;
            case "save" :
                if(!isSaving) requestToggleSave();
                break;
        }
    }
    function requestToggleSave(){
        console.log("REQUEST PENDING");
        setIsSaving(true);
        dispatch(saveToggled(_id)); // global action
        dispatch(toggleSavedPostInSavedPostSliceOptimistic(data));

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/saved-posts/${_id}`,null,{withCredentials:true})
        .then(response=>{
            console.log("Success", response.data);
            // isBookmarked property of the post in the feedPosts slice is now in sync with real state and is no more optimistic
        })
        .catch(error=>{
            console.log('Error executing toggle save request', error);
            dispatch(saveToggled(_id)); // global action
            dispatch(toggleSavedPostInSavedPostSliceOptimistic({...data, isBookmarked : !data.isBookmarked}));
        })
        .finally(()=>{
            setIsSaving(false);
        });
    }
    function requestToggleLike(){
        console.log("REQUEST PENDING");
        setIsLiking(true);  // NOTE THIS : this avoids race condition
        dispatch(likeToggled(_id)); // this is an optimistic update

        axios
        .patch(import.meta.env.VITE_BACKEND_URL+"/api/likes/"+_id, null, {withCredentials : true})
        .then(response=>{
            console.log("Success", response.data);
            // isLiked property of the post in the feedPosts slice is now in sync with real state and is no more optimistic
        })
        .catch(error=>{
            console.log('Error executing toggle like request', error);
            dispatch(likeToggled(_id)); // this is rolling back to initial state after the request fails
        })
        .finally(()=>{
            setIsLiking(false);
        })
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
                <div className={styles.postPic}>
                    <img src={image.url} className={styles.mainPic}></img>
                    <img src={image.url} className={styles.shadowPic}></img>
                </div>
                <div className={styles.postFooter}>
                    <div className={styles.postContentContainer}>
                        <div className={styles.postContent}>
                            {content}
                        </div>
                    </div>
                    <div className={styles.postActions}>
                        <div className={styles.likeAndComment}>
                            <div className={styles.like} onClick={()=>handleClick("like")}>
                                <div className={styles.likesCount}>{likesCount}</div>
                                {
                                    !isLiked ? 
                                    <FontAwesomeIcon className={styles.postOption} icon={thumbRegular}></FontAwesomeIcon>
                                    : <FontAwesomeIcon className={styles.postOption} icon={thumbSolid}></FontAwesomeIcon>
                                }
                            </div>
                            <div className={styles.comment} onClick={()=>handleClick("comment")}>
                                <div className={styles.commentsCount}>{commentsCount}</div>
                                <FontAwesomeIcon className={styles.postOption} icon={commentRegular}></FontAwesomeIcon>
                            </div>
                        </div>
                        <div className={styles.bookmark} onClick={()=>handleClick("save")}>
                                {
                                    !isBookmarked ? 
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
