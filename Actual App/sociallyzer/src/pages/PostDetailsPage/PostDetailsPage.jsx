// library imports
import {motion} from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// local imports
import styles from "./PostDetailsPage.module.css";
import postPic from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";


export default function PostDetailsPage(){
    useEffect(()=>{
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden"; //NOTE : directly modifying DOM when using React is not encouraged as it might conflict with React's state management and result in unexpected behaviour
        // but this is a safe exception because the body element itself does not come under react components' tree
        return ()=>{
            document.body.style.overflow = originalStyle;
        }
    },[]);

    const navigate = useNavigate();

    function closePostDetails(){
        navigate(-1);
    }
    return (
        <>
            <motion.div className={styles.postDetailsContainer}
            initial={{ opacity:0, scale:1.1}}
            animate={{opacity:1, scale:1}}
            exit={{ opacity:0, scale:1.1}}
            transition={{duration:0.3, ease:"easeOut"}}
            >
                <div className={styles.postDetailsMain}>
                    <div className={styles.closeIcon} onClick={closePostDetails}>
                        <FontAwesomeIcon className={styles.xMark} icon={faXmark} />
                    </div>
                    <div className={styles.picture}>
                        <img src={postPic}></img>
                    </div>
                    <div className={styles.postInfo}>
                        <div className={styles.postInfoHeader}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget eros
    at libero malesuada congue. Integer nec nunc vitae turpis porttitor
    venenatis. Suspendisse potenti. Curabitur scelerisque, justo eget aliquet
    porttitor, sapien justo porta lectus, non aliquam magna magna nec quam.
    Morbi posuere eros nec lacus finibus, vitae facilisis odio tristique. Proin
    rhoncus, turpis ut volutpat gravida, sapien purus gravida est, nec eleifend
    elit arcu a nibh. Nullam eget tincidunt nunc. Donec convallis magna sed
    augue viverra, vitae vulputate nunc aliquam.
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames
    ac turpis egestas. Etiam at mauris dui. Curabitur eget felis non erat
    commodo dictum. Sed posuere tellus eu dui congue, nec pulvinar ex pretium.
    Ut vel leo est. Nullam ultricies nunc in felis egestas, ut posuere sem
    convallis.
    Sed dictum venenatis ex, vel sodales massa condimentum in. Cras nec erat ac
    sem dictum cursus. Fusce posuere eros ac quam gravida, eget laoreet ex
    rhoncus. Duis tempor, nibh et luctus accumsan, mauris nibh dictum massa, sit
    amet imperdiet ligula sem ac neque.
    Donec malesuada libero in felis dictum tincidunt. Curabitur maximus magna id
    leo luctus, et luctus sem pretium. Aliquam erat volutpat. Duis dignissim
    lacus nec massa interdum, vitae dignissim libero mattis. Integer laoreet
    lacus purus, id ultrices leo luctus a. Pellentesque habitant morbi tristique
    senectus et netus et malesuada fames ac turpis egestas.
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}