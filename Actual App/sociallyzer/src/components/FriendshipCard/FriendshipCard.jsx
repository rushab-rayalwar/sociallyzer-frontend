// external imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// local imports
import styles from "./FriendshipCard.module.css";
import postPic from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";

export default function FriendshipCard({name, friendsInCommon}){
    const [dropdownMenu, setDropdownMenu] = useState(false);
    function toggleDropdownMenu(){
        setDropdownMenu(!dropdownMenu);
    }
    return(
        <>
            <div className={styles.friendshipCard}>
                <div className={styles.left}>
                    <div className={styles.profilePic}>
                        <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="profile pic"/>
                    </div>
                    <div className={styles.nameAndInfo}>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.info}>{friendsInCommon} mutual friends <div className={styles.dot}></div> <span className={styles.friendCategory}>General</span></div>
                    </div>
                </div>
                <div className={styles.right}>
                    {/* <div className={`${styles.acceptButton} ${styles.button}`}>Accept</div>
                    <div className={`${styles.deleteButton} ${styles.button}`}>Delete</div> */}
                    <div className={styles.friendCategoryDropdown}>
                        <div className={styles.dropdownValue} onClick={toggleDropdownMenu}>General <FontAwesomeIcon icon={faCaretDown} className={dropdownMenu ? `${styles.dropdownArrow} ${styles.dropdownArrowInverted}` : styles.dropdownArrow}></FontAwesomeIcon>
                            {dropdownMenu && 
                                <AnimatePresence>
                                    <motion.div className={styles.dropdownMenu}>
                                        <div className={styles.dropdownOption}>General</div>
                                        <div className={styles.dropdownOption}>Close Friends</div>
                                        <div className={styles.dropdownOption}>Inner Circle</div>
                                    </motion.div>
                                </AnimatePresence>
                            }
                        </div>
                    </div>
                    <div className={`${styles.button} ${styles.removeButton}`}>Remove</div>
                </div>
            </div>
        </>
    )
}