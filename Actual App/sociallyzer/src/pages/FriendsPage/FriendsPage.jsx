//local imports
import styles from "./FriendsPage.module.css";
import Navbar from "../../components/Navbar/Navbar";

export default function FriendsPage(){
    return(
        <>
            <div className={styles.friendsPageContainer}>
                <div className={styles.background}>
                    <Navbar active="friends"/>
                </div>
            </div>
        </>
    )
}