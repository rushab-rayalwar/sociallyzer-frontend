// third-party imports
import {motion} from

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
                            <div className={styles.savedPosts}>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                                <SavedPost/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}