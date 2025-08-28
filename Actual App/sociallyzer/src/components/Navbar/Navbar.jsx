// external imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faUsers, faBookmark as bookmarkSolid} from "@fortawesome/free-solid-svg-icons";

// local imports
import styles from "./Navbar.module.css";

export default function Navbar(){
    return(
        <nav className={styles.navOptions}>
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
    </nav>
    )
}