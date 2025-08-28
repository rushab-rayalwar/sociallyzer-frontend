// third party imports
import {motion} from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

// local imports
import styles from "./FeedFilterOptions.module.css";
import { store } from "../../redux/store.js";
import { filterActions } from "../../redux/filtersReducer.js";

export default function FeedFilterOptions({cursorLeft, cursorEntered}){
    const filters = useSelector(state=>state.filters);
    const toggleFilter = filterActions.toggleFilter;
    const dispatch = useDispatch();
    return(
            <motion.div className={styles.filterOptionsContainer}
            initial={{opacity:0, y:"25%", filter:"blur(0.5rem)"}}
            animate={{opacity:1, y:"0%", filter:"blur(0)", transition:{duration:0.3, ease:"easeOut"}}}
            exit={{opacity:0, y:"25%", filter:"blur(0.5rem)", transition:{duration:0.3, ease:"easeIn"}}}
            onMouseLeave={cursorLeft}
            onMouseEnter={cursorEntered}
            >
                <div className={styles.filterOptions}>
                    <div className={styles.filter} onClick={()=>dispatch(toggleFilter("general"))}>
                        <span>General</span>
                        <div className={styles.statusContainer}>
                            {filters.general && <div className={styles.dot}></div>}
                        </div>
                    </div>
                    <div className={styles.filter} onClick={()=>dispatch(toggleFilter("closeFriends"))}>
                        <span>Close Friends</span>
                        <div className={styles.statusContainer}>
                            {filters.closeFriends && <div className={styles.dot}></div>}
                        </div>
                    </div>
                    <div className={styles.filter} onClick={()=>dispatch(toggleFilter("innerCircle"))}>
                        <span>Inner Circle</span>
                        <div className={styles.statusContainer}>
                            {filters.innerCircle && <div className={styles.dot}></div>}
                        </div>
                    </div>
                </div>
            </motion.div>
    )
}