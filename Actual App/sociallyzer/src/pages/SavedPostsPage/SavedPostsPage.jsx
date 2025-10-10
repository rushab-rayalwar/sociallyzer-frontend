// third-party imports
import {motion} from "framer-motion";

// local imports
import styles from "./SavedPostsPage.module.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SavedPost from "../../components/SavedPost/SavedPost";

export default function SavedPostsPage(){
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
                                <SavedPost imageNumber="1"/>
                                <SavedPost imageNumber="3"/>
                                <SavedPost imageNumber="2"/>
                                <SavedPost imageNumber="1"/>
                                <SavedPost imageNumber="3"/>
                                <SavedPost imageNumber="2"/>
                                <SavedPost imageNumber="3"/>
                                <SavedPost imageNumber="1"/>
                                <SavedPost imageNumber="2"/>
                                <SavedPost imageNumber="3"/>
                                <SavedPost imageNumber="2"/>
                                <SavedPost imageNumber="1"/>
                                <SavedPost imageNumber="2"/>
                                <SavedPost imageNumber="1"/>
                                <SavedPost imageNumber="3"/>
                                <SavedPost imageNumber="1"/>
                                <SavedPost imageNumber="2"/>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}