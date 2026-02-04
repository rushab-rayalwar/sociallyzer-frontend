// third party imports
import {AnimatePresence, motion} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

// local imports
import Navbar from "../../components/Navbar/Navbar.jsx";
import Header from "../../components/Header/Header.jsx";
import styles from "./ProfilePage.module.css";
import image from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";
import ProfilePageComponentInGrid from "../../components/ProfilePagePostInGrid/ProfilePageComponentInGrid.jsx";
// related to redux
import fetchUserPosts from "../../redux/userPosts/userPostsThunk.js";

export default function ProfilePage(){

    const [hoveringOver, setHoveringOver] = useState(null);
    const [editing, setEditing] = useState(false);

    const userPosts = useSelector(state=>state.userPosts);
    console.log("user posts in profile page",userPosts);

    useEffect(()=>{
        if(userPosts.data.length == 0){
            dispatch(fetchUserPosts());
        }
    },[]);

    const dispatch = useDispatch()

    const imageInputRef = useRef();

    function getImageInput(){
        imageInputRef.current.click();  
    }
    function toggleEditing(){
        setEditing(prev=>!prev);
    }

    const variants = {
        hidden:{},
        show:{ transition:{staggerChild:0.05} },
        hoveringOverAChild:{ opacity:1 }
    }

    return(
        <>
            <div className={styles.profilePageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="profile"/>
                    <motion.section className={styles.profilePageSection}
                    initial={{opacity:0, filter:"blur(0.3rem)"}}
                    animate={{opacity:1, filter:"blur(0)"}}
                    >
                        <div className={styles.marginAtTop}></div>
                        <div className={styles.profilePage}>
                            <div className={styles.pageHeader}>
                                <div className={styles.profilePicSection}>
                                    {editing && <div className={styles.editPicOverlay} onClick={getImageInput}>
                                        <FontAwesomeIcon icon={faPencil} className={styles.pencilIcon} ></FontAwesomeIcon>
                                        <input type="file" accept="image/*" name="profileImage" ref={imageInputRef}></input>
                                    </div>}
                                    <img src={image}></img>
                                </div>
                                <div className={styles.profileInfoSection}>
                                    <div className={styles.userName}>
                                        Rushab Rayalwar
                                    </div>
                                    <div className={styles.profileInfo}>
                                        <span>10 Posts</span> <span>100 Friends</span>
                                    </div>
                                    {
                                        editing ? (<textarea className={styles.userBioTextArea}>
                                            Just another curious soul trying to make sense of this chaotic, beautiful world. Music, movies, and random midnight thoughts — that’s my kind of therapy. Just another curious soul trying to make sense of this chaotic, beautiful world. Music, movies, and random midnight thoughts — that’s my kind of therapy.
                                            </textarea>) : (<div className={styles.userBio}>
                                        Just another curious soul trying to make sense of this chaotic, beautiful world. Music, movies, and random midnight thoughts — that’s my kind of therapy. Just another curious soul trying to make sense of this chaotic, beautiful world. Music, movies, and random midnight thoughts — that’s my kind of therapy.
                                    </div>) // NOTE THIS
                                    }
                                    <div className={styles.editProfileButtonContainer}>
                                        {!editing ? (<div className={styles.editProfileButton} onClick={toggleEditing}>Edit Profile</div>) : (<div className={styles.editProfileButton} onClick={toggleEditing}>Save</div>)}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.divider}></div>
                            <motion.div className={styles.posts}
                            variants={variants}
                            initial="hidden"
                            animate={hoveringOver == null ? "show" : "hoveringOverAChild"}
                            >
                                {/* {Array.from({length:15},(_, index)=>{
                                    // let imageNumber = Math.floor(Math.random()*3) + 1;
                                    let imageNumber = index%3 + 1;
                                    return (
                                        <PostInAGrid imageNumber={imageNumber} key={index} id={index} hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(index)}></PostInAGrid>
                                    )
                                })} */}
                                {
                                    userPosts.data.length > 0 &&
                                    userPosts.data.map(p=>{
                                        return <ProfilePageComponentInGrid post={p} key={p._id} hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(p._id)}></ProfilePageComponentInGrid>
                                    })
                                }
                            </motion.div>
                        </div>
                    </motion.section>
                </div>
                <AnimatePresence mode="await">
                    <Outlet key={location.pathname}></Outlet>
                </AnimatePresence>
            </div>
        </>
    )
}