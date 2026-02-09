// library imports
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowUp, faThumbsUp, faComment, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as thumbsUpHollow } from "@fortawesome/free-regular-svg-icons";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

// local imports
import styles from "./PostDetailsPage.module.css";
import postPic from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import postOwnerPic from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import Comment from "../../components/Comment/Comment";
import ToastNotification from "../../components/ToastNotification/ToastNotification";

export default function PostDetailsPage(){

    const {postId} = useParams();

    const [postData, setPostData] = useState({isLoading:false, data:null});
    const [postComments, setPostComments] = useState({isLoading:false, data:null});

    const postInfoDivRef = useRef();
    const commentRef = useRef();
    const [arrowIsVisible, setArrowIsVisible] = useState(false);

    useEffect(()=>{
        const originalStyle = window.getComputedStyle(document.body).overflow; // prevent scrolling when this page is open
        if(postData.data != null){
            console.log("Post DATA --- ", postData);
            document.body.style.overflow = "hidden"; //NOTE : directly modifying DOM when using React is not encouraged as it might conflict with React's state management and result in unexpected behaviour
            // but this is a safe exception because the body element itself does not come under react components' tree
        }
        return ()=>{
            document.body.style.overflow = originalStyle;
        }
    },[postData]);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                setPostData({isLoading:true, data:null});
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}`,
                    {withCredentials:true}
                );
                setPostData({isLoading:false, data:response.data.data});
            } catch (error) {
                console.error("post Details could not be fetched", error);
                setPostData({isLoading:false, data:null});
            }
        };
    
        fetchPostData();
    }, [postId]);
    useEffect(()=>{
        const fetchComments = async () => {
            try{
                setPostComments({isLoading:true, data:null});
                let response = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/comments/'+postId, {withCredentials:true});
                setPostComments({isLoading:false, data:response.data.data});
            } catch(error) {
                console.log("Comments could not be fetched", error);
                setPostComments({isLoading:false, data:null});
            }
        }
        fetchComments();
    }, postId);

    const navigate = useNavigate();

    function closePostDetails(){
        navigate(-1);
    }
    function jumpToTopCommnent(){
        // postInfoDivRef.current.scrollTop = "0";  NOTE THIS
        postInfoDivRef.current.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }
    function handleScrollButtonVisibility(){
        if(postInfoDivRef.current.scrollTop > 0){
            setArrowIsVisible(true);
        } else {
            setArrowIsVisible(false);
        }
    }

    return (
        <>  
            {
                postData.isLoading && 
                <ToastNotification message={"Loading..."}/>
            }
            {
                postData.data &&
                <motion.div 
                className={styles.postDetailsContainer}
                initial={{ opacity:1, scale:1.1, filter:"blur(0.5rem)"}}
                animate={{opacity:1, scale:1, filter:"blur(0)"}}
                transition={{duration:0.4, ease:"easeOut"}}
                >
                    <div className={styles.postDetailsMain}>
                        <div className={styles.navButtons}>
                            <div className={styles.navButton} onClick={closePostDetails}>
                                <FontAwesomeIcon className={styles.xMark} icon={faXmark} />
                            </div>
                            <div className={styles.navButton}>
                                <FontAwesomeIcon className={styles.bookmark} icon={faBookmark} />
                            </div>
                            <AnimatePresence>
                                {arrowIsVisible && 
                                    <motion.div className={styles.navButton} onClick={jumpToTopCommnent}
                                    initial={{ opacity:0, filter:"blur(0.3rem)"}}
                                    animate={{opacity:1, filter:"blur(0)"}}
                                    exit={{opacity:0, filter:"blur(0.3rem)"}}
                                    transition={{duration:0.3, ease:"easeInOut"}}
                                    >
                                        <FontAwesomeIcon className={styles.arrowUp} icon={faArrowUp}></FontAwesomeIcon>
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                        <div className={styles.picture}>
                            {/* <img src={postPic}></img> */}
                            <img src={postData.data.image.url}></img>
                        </div>
                        <div className={styles.postInfo} ref={postInfoDivRef} onScroll={handleScrollButtonVisibility}>
                            <div className={styles.postInfoHeader}>
                                <div className={styles.postOwnerPic}>
                                    <img src={postOwnerPic} className={styles.postOwnerPic}></img>
                                </div>
                                <div className={styles.postOwnerDetails}>
                                    {/* <span className={styles.postOwnerName}>Rushab Rayalwar </span> */}
                                    <span className={styles.postOwnerName}>{postData.data.userName}</span>
                                    <div className={styles.dot}></div>
                                    <span className={styles.postOwnerFriendType}>General</span>
                                </div>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.postInfoBody}>
                                <div className={styles.postDescriptionContainer}>
                                    {/* The quick brown fox jumps over the lazy dog. This sentence is used to test typing skills and a font's legibility because it contains every letter of the alphabet. It's a classic example of a pangram, a sentence that uses every letter at least once. */}
                                    {postData.data.content}
                                </div>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.userActionsContainer}>
                                <div className={styles.likesAndCommentsNumbers}>
                                    <div className={styles.number}>
                                        <FontAwesomeIcon icon={faThumbsUp} className={styles.numberIcon}></FontAwesomeIcon>
                                        {/* <span>34 Likes</span> */}
                                        <span>{postData.data.likesCount} Likes</span>
                                    </div>
                                    <div className={styles.number}>
                                        <FontAwesomeIcon icon={faComment} className={styles.numberIcon}></FontAwesomeIcon>
                                        {/* <span>10 Comments</span> */}
                                        <span>{postData.data.commentsCount} Comments</span>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <FontAwesomeIcon icon={thumbsUpHollow} className={styles.thumbsUpHollow}></FontAwesomeIcon>
                                    <textarea type="text" placeholder="Write a comment..." className={styles.commentInput} ref={commentRef}></textarea>
                                    <div className={styles.postCommentButton}>Post</div>
                                </div>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.comments} >
                                {
                                    postComments.data && 
                                    postComments.data.map(c=>{
                                        return <Comment comment={c} key={c._id}/>
                                    })
                                }
                                {
                                    !postComments.data && 
                                    <div className={styles.noComments}>
                                        No Comments yet!
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </>
    )
}