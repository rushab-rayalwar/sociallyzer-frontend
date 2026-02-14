// external imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faUsers, faBookmark as bookmarkSolid, faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// local imports
import styles from "./Navbar.module.css";

export default function Navbar({active}){
    const navigate = useNavigate();
    return(
        <nav className={styles.navOptions}>
            <div className={active=="home" ? `${styles.leftSideOption} ${styles.selected}`:styles.leftSideOption} onClick={()=>navigate("/home")}>
                {/* <i className="fa-solid fa-house"></i> */}
                <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
            </div>
            <div className={active=="profile" ? `${styles.leftSideOption} ${styles.selected}`:styles.leftSideOption} onClick={()=>navigate("/profile")}>
                {/* <i className="fa-solid fa-user"></i> */}
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <div className={active=="addPost" ? `${styles.leftSideOption} ${styles.selected} ${styles.createPost}`: `${styles.leftSideOption} ${styles.createPost}`} onClick={()=>navigate("/add-post")}>
                {/* <i className="fa-solid fa-user"></i> */}
                <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                <div className={styles.createPostTooltip}>
                    
                </div>
            </div>
            <div className={active=="friends" ? `${styles.leftSideOption} ${styles.selected}`:styles.leftSideOption} onClick={()=>navigate("/friends")}>
                {/* <i className="fa-solid fa-users"></i> */}
                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
            </div>
            <div className={active=="saved" ? `${styles.leftSideOption} ${styles.selected}`:styles.leftSideOption} onClick={()=>navigate("/saved")}>
                {/* <i className="fa-solid fa-bookmark"></i> */}
                <FontAwesomeIcon icon={bookmarkSolid}></FontAwesomeIcon>
            </div>
    </nav>
    )
}