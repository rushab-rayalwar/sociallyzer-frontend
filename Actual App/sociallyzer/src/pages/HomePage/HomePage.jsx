// thir party libraries
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// fontawesome imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faUsers, faBookmark as bookmarkSolid} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faComment, faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
// locale imports
import styles from "./HomePage.module.css";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import postIMG2 from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import postIMG3 from "../../assets/dummyPosts/zdzszgh.png";
import filterIcon from "../../assets/icons/filter.svg";


export default function Home(){ // NOTE the state logic here
    const hovering = useRef(false);
    const timeout = useRef(null);
    const [visible, setVisible] = useState(false);
    
    const filterIconRef = useRef();

    function cursorEntered(){
        console.log("enter");
        hovering.current = true;
        if(timeout) clearTimeout(timeout.current);
        setVisible(true);
    }
    function cursorLeft(){
        console.log("leave");
        hovering.current = false;
        timeout.current = setTimeout(()=>{
            if(!hovering.current){
                setVisible(false);
            }
        }, 600);
    }
    // // let hovering = false, visible = false;

    // let filterOptionsContainer = document.querySelector(".filterOptionsContainer");
    // let filterIcon = document.querySelector("#filterIcon");

    // let footer = document.querySelector("footer"); //

    // filterIcon.addEventListener('mouseenter', showFilterOptions);
    // filterOptionsContainer.addEventListener('mouseleave', hideFilterOptions);
    // filterOptionsContainer.addEventListener('mouseenter', mouseHovering);

    // function showFilterOptions(){
    //     filterOptionsContainer.style.display = 'flex'; // 
    //     setTimeout(()=>{
    //         filterOptionsContainer.style.opacity = 1;
    //     },0);
    //     footer.style.width = "100%"; // 
    //     hovering = true;
    // }
    // function hideFilterOptions(){
    //     hovering = false;
    //     setTimeout(()=>{
    //         if(!hovering){
    //             filterOptionsContainer.style.opacity = 0;
    //             setTimeout(()=>{
    //                 filterOptionsContainer.style.display = 'none'; // 
    //                 footer.style.width = 'fit-content';
    //             }, 250);
                    
    //         }
    //     },1000)
    // }
    // function mouseHovering(){
    //     hovering = true;
    // }
    return (
        <>
        <div className={styles.background}>
            <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.title}>
                    <span>
                        <img src={icon} alt="logo"></img>
                        SOCIALLYZER
                    </span>
                </div>
            </div>
            <div className={styles.userName}>
                <div className={styles.userProfilePicContainer}>
                    <img src={postIMG1} className={styles.userProfilePic}></img>
                </div>
                <span>Rushab Rayalwar</span>
            </div>
        </header>
        <aside className={styles.navOptions}>
            <div className={`${styles.leftSideOption} ${styles.selected}`}>
                {/* <i className="fa-solid fa-house"></i> */}
                <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
            </div>
            <div className={styles.leftSideOption}>
                {/* <i className="fa-solid fa-user"></i> */}
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <div className={styles.leftSideOption}>
                {/* <i className="fa-solid fa-users"></i> */}
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
            </div>
            <div className={styles.leftSideOption}>
                {/* <i className="fa-solid fa-bookmark"></i> */}
                <FontAwesomeIcon icon={bookmarkSolid}></FontAwesomeIcon>
            </div>
        </aside>
        <section className={styles.feed}>
            <div className={styles.prePosts}></div>
            <div className={styles.posts}>
                <div className={styles.post}>
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
                                {/* <i className="fa-regular fa-thumbs-up postOption"></i> */}
                                <FontAwesomeIcon className={styles.postOption} icon={faThumbsUp}></FontAwesomeIcon>
                                {/* <i className="fa-regular fa-comment postOption"></i> */}
                                <FontAwesomeIcon className={styles.postOption} icon={faComment}></FontAwesomeIcon>
                            </div>
                            <div className={styles.bookmark}>
                                {/* <i className="fa-regular fa-bookmark postOption"></i> */}
                                <FontAwesomeIcon className={styles.postOption} icon={bookmarkRegular}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.post}>
                    <div className={styles.postHeader}>
                        <div className={styles.postInfo}>
                            <div className={styles.userProfilePicContainer}>
                                <img src={postIMG2} className={styles.userProfilePic}></img>
                            </div>
                            <div className={styles.postNameAndTime}>
                                <span className={styles.postUserName}>Rohan Rayalwar</span>
                                <span className={styles.timePosted}>22:34 Sunday 12/08/2025</span>
                            </div>
                        </div>
                        <div className={styles.friendLevel}>
                            <span>Close Friend</span>
                        </div>
                    </div>
                    <div className={styles.postPic}>
                        <img src={postIMG2} className={styles.mainPic}></img>
                        <img src={postIMG2} className={styles.shadowPic}></img>
                    </div>
                    <div className={styles.postFooter}>
                        <div className={styles.postActions}>
                            <div className={styles.likeAndComment}>
                                {/* <i className="fa-regular fa-thumbs-up postOption"></i> */}
                                <FontAwesomeIcon className={styles.postOption} icon={faThumbsUp}></FontAwesomeIcon>
                                {/* <i className="fa-regular fa-comment postOption"></i> */}
                                <FontAwesomeIcon className={styles.postOption} icon={faComment}></FontAwesomeIcon>
                            </div>
                            <div className={styles.bookmark}>
                                {/* <i className="fa-regular fa-bookmark postOption"></i> */}
                                <FontAwesomeIcon className={styles.postOption} icon={bookmarkRegular}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.post}>
                    <div className={styles.postHeader}>
                        <div className={styles.postInfo}>
                            <div className={styles.userProfilePicContainer}>
                                <img src={postIMG3} className={styles.userProfilePic}></img>
                            </div>
                            <div className={styles.postNameAndTime}>
                                <span className={styles.postUserName}>Rohan Rayalwar</span>
                                <span className={styles.timePosted}>22:34 Sunday 12/08/2025</span>
                            </div>
                        </div>
                        <div className={styles.friendLevel}>
                            <span>Inner Circle </span>
                        </div>
                    </div>
                    <div className={styles.postPic}>
                        <img src={postIMG3} className={styles.mainPic}></img>
                        <img src={postIMG3} className={styles.shadowPic}></img>
                    </div>
                    <div className={styles.postFooter}>
                        <div className={styles.postActions}>
                            <div className={styles.likeAndComment}>
                                {/* <i className="fa-regular fa-thumbs-up postOption"></i> */}
                                <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                                {/* <i className="fa-regular fa-comment postOption"></i> */}
                                <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                            </div>
                            <div className={styles.bookmark}>
                                {/* <i className="fa-regular fa-bookmark postOption"></i> */}
                                <FontAwesomeIcon icon={bookmarkRegular}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer className={styles.footer}>
            <img src={filterIcon} className={styles.filterIcon} ref={filterIconRef} onMouseEnter={cursorEntered} onMouseLeave={cursorLeft}></img>
            <AnimatePresence>
                {visible && <motion.div className={styles.filterOptionsContainer}
                initial={{opacity:0, y:"4.0%", filter:"blur(0.3rem)"}}
                animate={{opacity:1, y:"0%", filter:"blur(0)", transition:{duration:0.2, ease:"easeOut"}}}
                exit={{opacity:0, y:"4.0%", filter:"blur(0.3rem)", transition:{duration:0.2, ease:"easeIn"}}}
                onMouseLeave={cursorLeft}
                onMouseEnter={cursorEntered}
                >
                    <div className={styles.filterOptions}>
                        <div className={styles.filter}>
                            <span>General</span>
                            <div className={styles.statusContainer}>
                                <div className={styles.dot}></div>
                            </div>
                        </div>
                        <div className={styles.filter}>
                            <span>Close Friends</span>
                            <div className={styles.statusContainer}>
                                <div className={styles.dot}></div>
                            </div>
                        </div>
                        <div className={styles.filter}>
                            <span>Inner Circle</span>
                            <div className={styles.statusContainer}>
                            </div>
                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </footer>
        </div>
        </>
    )
}