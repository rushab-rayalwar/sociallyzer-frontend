// third-party imports
import {motion, AnimatePresence} from "framer-motion";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// local imports
import styles from "./SavedPostsPage.module.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SavedPost from "../../components/PostInGrid/PostInAGrid";
//redux related imports
import fetchSavedPosts from "../../redux/savedPostsSlice/savedPostsThunk.js";

export default function SavedPostsPage(){ // VERY IMPORTANT NOTE : Please study the staggering and hovering logic here
    const [hoveringOver, setHoveringOver] = useState(null);

    const dispatch = useDispatch();
    const savedPosts = useSelector(state=>state.savedPosts);
    
    useEffect(()=>{
        dispatch(fetchSavedPosts());
    },[]);

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
                                {/* <SavedPost imageNumber="1" key="17" id="17" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(17)}/>
                                <SavedPost imageNumber="3" key="16" id="16" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(16)}/>
                                <SavedPost imageNumber="2" key="15" id="15" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(15)}/>
                                <SavedPost imageNumber="1" key="14" id="14" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(14)}/>
                                <SavedPost imageNumber="3" key="13" id="13" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(13)}/>
                                <SavedPost imageNumber="2" key="12" id="12" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(12)}/>
                                <SavedPost imageNumber="3" key="11" id="11" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(11)}/>
                                <SavedPost imageNumber="1" key="10" id="10" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(10)}/>
                                <SavedPost imageNumber="2" key="9" id="9" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(9)}/>
                                <SavedPost imageNumber="3" key="8" id="8" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(8)}/>
                                <SavedPost imageNumber="2" key="7" id="7" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(7)}/>
                                <SavedPost imageNumber="1" key="6" id="6" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(6)}/>
                                <SavedPost imageNumber="2" key="5" id="5" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(5)}/>
                                <SavedPost imageNumber="1" key="4" id="4" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(4)}/>
                                <SavedPost imageNumber="3" key="3" id="3" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(3)}/>
                                <SavedPost imageNumber="1" key="2" id="2" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(2)}/>
                                <SavedPost imageNumber="2" key="1" id="1" hoveringOver={hoveringOver} mouseLeave={()=>setHoveringOver(null)} mouseEnter={()=>setHoveringOver(1)}/> */}
                            </motion.div>
                            <AnimatePresence mode="await">
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
                            </AnimatePresence>
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