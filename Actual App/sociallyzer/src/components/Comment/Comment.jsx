// local imports
import postOwnerPic from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import styles from "./Comment.module.css"

export default function Comment({name}){
    return(
        <>
        <div className={styles.comment}>
            <div className={styles.commentOwnerInfo}>
                <img src={postOwnerPic} className={styles.commentOwnerPic}></img>
                <span className={styles.commentOwnerName}>
                    {name}
                </span>
            </div>
            <div className={styles.commentContent}>
                The quick brown fox jumps over the lazy dog. This sentence is used to test typing skills and a font's legibility because it contains every letter of the alphabet.
            </div>
        </div>
        </>
    )
}