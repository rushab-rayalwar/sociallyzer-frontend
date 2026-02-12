// third-party imports
import {motion, AnimatePresence} from "framer-motion";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// local imports
import styles from "./SavedPostsPage.module.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SavedPost from "../../components/SavedPost/SavedPost.jsx";
//redux related imports
import fetchSavedPosts from "../../redux/features/savedPostsSlice/savedPostsThunk.js";

export default function SavedPostsPage(){ // VERY IMPORTANT NOTE : Please study the staggering and hovering logic here
    const [hoveringOver, setHoveringOver] = useState(null);
    const [noPosts, setNoPosts] = useState(false);

    const dispatch = useDispatch();
    const savedPosts = useSelector(state=>state.savedPosts);
    console.log("Saved posts", savedPosts);
    
    useEffect(()=>{
        if(savedPosts.data.length == 0){
            dispatch(fetchSavedPosts());
        }
    },[dispatch]);
    useEffect(()=>{ // toggle the noPosts variable to control the visibility of the card that says "No Saved Posts!"
        if(savedPosts.data.length == 0){
            if(savedPosts.loading){
                setNoPosts(false);
            } else {
                setNoPosts(true);
            }
        } else {
            setNoPosts(false);
        }
    },[savedPosts]);

    const variants = {
        hidden: {},
        show: { transition:{staggerChildren:0.05}},
        hoveringOverAChild: {opacity:1}
    };

    return(
        <>
            <div className={styles.savedPostsPageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="saved"/>
                    <section className={styles.savedPostsSection}>
                        <div className={styles.marginAtTop}></div>
                        <div className={styles.savedPostsContainer}>
                            <div className={styles.savedPostsHeader}>Saved Posts</div>
                            <motion.div className={styles.savedPosts}
                            variants={variants}
                            initial="hidden"
                            animate={hoveringOver == null ? "show" : "hoveringOverAChild"}
                            >
                                {
                                    !savedPosts.loading && savedPosts.data.length > 0 && savedPosts.data.map(s=>{
                                        return <SavedPost post={s} key={s._id} hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(s.id)}></SavedPost>
                                    })
                                }
                            </motion.div>
                            {/* <AnimatePresence mode="await"> */}
                            {savedPosts.loading && <motion.div className={styles.loadingCard}
                            initial={{opacity:0, y:"-10%"}}
                            animate={{opacity:1, y:"0%"}}
                            exit={{opacity:0, y:"-10%"}}
                            transition={{duration:0.4, ease:"easeOut"}}
                            >
                                <div className={styles.loadingCardHeader}>
                                    <div className={styles.loading}>LOADING !</div>
                                    <div className={styles.loadingShadow}>LOADING !</div> {/* NOTE : This is to create the glow effect */}
                                </div>
                                
                                <div className={styles.loadingCardBody}>
                                    Heads up! This app runs on a free hosting service, so the first request after inactivity might take a little longer while the server spins up. Subsequent requests will be much faster.
                                </div>
                            </motion.div>}
                            {noPosts && <motion.div className={styles.loadingCard}
                            initial={{opacity:0, y:"-10%"}}
                            animate={{opacity:1, y:"0%"}}
                            exit={{opacity:0, y:"-10%"}}
                            transition={{duration:0.4, ease:"easeOut"}}
                            >
                                <div className={styles.loadingCardHeader}>
                                    <div className={styles.loading}>No Saved Posts !</div>
                                    <div className={styles.loadingShadow}>No Saved Posts !</div> {/* NOTE : This is to create the glow effect */}
                                </div>
                                
                                {/* <div className={styles.loadingCardBody}>
                                    Heads up! This app runs on a free hosting service, so the first request after inactivity might take a little longer while the server spins up. Subsequent requests will be much faster.
                                </div> */}
                            </motion.div>}
                            {/* </AnimatePresence> */}
                        </div>
                    </section>
                </div>
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname}/> {/* NOTE: Providing key={location.key} is necessary because Framer Motion's AnimatePresence component needs a changing key to detect that a child component has been replaced. Without a changing key, AnimatePresence won't recognize the route change as a trigger for the exit and entry animations*/}
                </AnimatePresence>
            </div>
        </>
    )
}