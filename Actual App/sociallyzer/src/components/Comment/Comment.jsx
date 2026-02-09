// local imports
import postOwnerPic from "../../assets/dummyPosts/Screenshot 2024-03-20 002014.jpg";
import styles from "./Comment.module.css"

export default function Comment({comment}){
    return(
        <>
        <div className={styles.comment}>
            <div className={styles.commentOwnerInfo}>
                <img src={postOwnerPic} className={styles.commentOwnerPic}></img>
                <span className={styles.commentOwnerName}>
                    {comment.authorName}
                </span>
            </div>
            <div className={styles.commentContent}>
                {comment.content}
            </div>
        </div>
        </>
    )
}