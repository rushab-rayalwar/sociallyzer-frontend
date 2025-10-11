// third-party imports
import {motion} from "framer-motion";
import { useState } from "react";

// local imports
import styles from "./SavedPostsPage.module.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SavedPost from "../../components/SavedPost/SavedPost";

export default function SavedPostsPage(){
    const [hoveringOver, setHoveringOver] = useState(null);
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
                            variants={{show: { transition:{staggerChildren:0.05} } }}
                            initial="hidden"
                            animate="show"
                            >
                                <SavedPost imageNumber="1" key="17" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(17)}/>
                                <SavedPost imageNumber="3" key="16" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(16)}/>
                                <SavedPost imageNumber="2" key="15" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(15)}/>
                                <SavedPost imageNumber="1" key="14" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(14)}/>
                                <SavedPost imageNumber="3" key="13" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(13)}/>
                                <SavedPost imageNumber="2" key="12" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(12)}/>
                                <SavedPost imageNumber="3" key="11" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(11)}/>
                                <SavedPost imageNumber="1" key="10" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(10)}/>
                                <SavedPost imageNumber="2" key="9" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(9)}/>
                                <SavedPost imageNumber="3" key="8" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(8)}/>
                                <SavedPost imageNumber="2" key="7" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(7)}/>
                                <SavedPost imageNumber="1" key="6" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(6)}/>
                                <SavedPost imageNumber="2" key="5" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(5)}/>
                                <SavedPost imageNumber="1" key="4" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(4)}/>
                                <SavedPost imageNumber="3" key="3" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(3)}/>
                                <SavedPost imageNumber="1" key="2" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(2)}/>
                                <SavedPost imageNumber="2" key="1" onMouseLeave={()=>setHoveringOver(null)} onMouseEnter={()=>setHoveringOver(1)}/>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}