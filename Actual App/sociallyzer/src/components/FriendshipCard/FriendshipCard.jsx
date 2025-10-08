 // external imports
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// local imports
import styles from "./FriendshipCard.module.css";

export default function FriendshipCard({name, friendsInCommon, enableBlur, toggleFocus, id, focus}){
    useEffect(()=>{
        console.log("Enable blur", enableBlur);
    })

    const [dropdownMenu, setDropdownMenu] = useState(false);
    function toggleDropdownMenu(){
        if(!enableBlur){ //NOTE this condition ensures that only one dropdown menu is open at a time. List items which are blur and not focused cannot open their dropdown menu
            setDropdownMenu(!dropdownMenu);
            toggleFocus(id);
        }
    }

    const variants = {
        right : {
            opacity : 1, x:0, y:0, filter: "blur(0)"
        },
        left : {
            opacity : 0, x:"5%", y:0, filter: "blur(0.3rem)"
        }
    }

    function getClassNames(id, focus, enableBlur){
        let classNames = enableBlur ? `${styles.blurCard} ${styles.friendshipCardNoHover}` : `${styles.noBlurCard} ${styles.friendshipCard}`;
        if(focus === id){
            classNames = classNames + ` ${styles.focused}`
        }
        return classNames;
    }
    
    return(
        <>
        {/* className={enableBlur ? `${styles.blurCard} ${styles.friendshipCardNoHover}` : `${styles.noBlurCard} ${styles.friendshipCard}`} */}
            <motion.div className={getClassNames(id, focus, enableBlur)}
            variants = {variants}
            transition={{opacity:{duration:0.6, ease:"easeOut"}, y:{ type:"spring", stiffness:50, damping:10}, x:{duration:0.55, ease:"easeOut"}, filter:{duration:0.5, ease:"easeOut"}}}
            >
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
                    <div className={styles.friendCategoryDropdown}>
                        <div className={styles.dropdownValue} onClick={toggleDropdownMenu}>General <FontAwesomeIcon icon={faCaretDown} className={dropdownMenu ? styles.dropdownArrowInverted : styles.dropdownArrow}></FontAwesomeIcon>
                            <AnimatePresence>
                                {dropdownMenu && 
                                        <motion.div className={styles.dropdownMenu}
                                        initial={{opacity:0, filter:'blur(0.2rem)', y:'-10%'}}
                                        animate={{opacity:1, filter:'blur(0)',  y:'0%'}}
                                        exit={{opacity:0, filter:'blur(0.2rem)',  y:'-10%'}}
                                        transition={{duration:0.3, ease:"easeOut"}}
                                        >
                                            <div className={styles.dropdownOption}>
                                                General 
                                                <div className={styles.statusContainer}>
                                                    {/* { <div className={styles.currentCategory}></div>} */}
                                                </div>
                                            </div>
                                            <div className={styles.dropdownOption}>
                                                Close Friends
                                                <div className={styles.statusContainer}>
                                                    { <div className={styles.currentCategory}></div>}
                                                </div>
                                            </div>
                                            <div className={styles.dropdownOption}>
                                                Inner Circle
                                                <div className={styles.statusContainer}>
                                                    {/* { <div className={styles.currentCategory}></div>} */}
                                                </div>
                                            </div>
                                        </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className={`${styles.button} ${styles.removeButton}`}>Remove</div>
                </div>
            </motion.div>
        </>
    )
}