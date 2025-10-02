//external imports
import {motion} from "framer-motion";
import { useState, useEffect } from "react";

//local imports
import styles from "./FriendsPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import FriendshipCard from "../../components/FriendshipCard/FriendshipCard";

// images / svgs
import icon from "../../assets/icons/icon.svg";
import postIMG1 from "../../assets/dummyPosts/Screenshot 2024-02-15 013817.jpg";

export default function FriendsPage(){
    const [tab, setTab] = useState("left");
    const [hoveringOver, setHoveringOver] = useState(null); //  flag to check which card is being hovered over
    const [firstMount, setFirstMount] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setFirstMount(false);
        }, 1000);
    }, []);

    const containerVariants = {
        hidden : {
            opacity : 0
        },
        firstMount: {
            opacity : 1,
            transition:{staggerChildren:0.05, delayChildren:0.1, duration:0.1, ease:"easeOut"}
        },
        switchToRightTab : {
            opacity : 1,
            transition:{staggerChildren:0.05, delayChildren:0.1, duration:0.1, ease:"easeOut"}
        },
        switchToLeftTag : {
            opacity : 1,
            transition:{staggerChildren:0.05, delayChildren:0.1, duration:0.1, ease:"easeOut"}
        }
    }
    return( 
        <>
            <div className={styles.friendsPageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="friends"/>
                    <div className={styles.preBody}></div>
                    <motion.section className={styles.body}
                    initial={{opacity:0, y:50}}
                    animate={{opacity:1, y:0}}
                    transition={{type:"spring", stiffness:120, damping:15, mass:0.9}}
                    >
                        <div className={styles.bodyHeader}>
                            <div className={tab=="left" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>setTab('left')}>
                                Manage Requests 
                            </div>
                            <div className={tab=="right" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>setTab('right')}>
                                Manage Friendships
                            </div>
                        </div>
                        {tab=="left" && <motion.div className={`${styles.bodyMain} ${styles.requests}`}
                        variants = {containerVariants}
                        initial = 'hidden'
                        animate = 'visible'
                        >
                            <FriendRequest firstMount={firstMount} name="Rohan Rayalwar" friendsInCommon="5" key='1'  enableBlur={( hoveringOver=='1' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('1')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendRequest firstMount={firstMount} name="Sheetal Rayalwar" friendsInCommon="5" key='2' enableBlur={( hoveringOver=='2' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('2')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendRequest firstMount={firstMount} name="Tatya Vinchu" friendsInCommon="5" key='3' enableBlur={( hoveringOver=='3' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('3')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendRequest firstMount={firstMount} name="Shourya Rayalwar" friendsInCommon="5" key='4' enableBlur={( hoveringOver=='4' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('4')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendRequest firstMount={firstMount} name="Gourang Rayalwar" friendsInCommon="5" key='5' enableBlur={( hoveringOver=='5' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('5')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendRequest firstMount={firstMount} name="Aditya Walture" friendsInCommon="5" key='6' enableBlur={( hoveringOver=='6' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('6')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendRequest firstMount={firstMount} name="Pratik Kurhe" friendsInCommon="5" key='7' enableBlur={( hoveringOver=='7' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('7')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendRequest firstMount={firstMount} name="Yuvraj Rathore" friendsInCommon="5" key='8' enableBlur={( hoveringOver=='8' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('8')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendRequest firstMount={firstMount} name="Ravi Rathore" friendsInCommon="5" key='9' enableBlur={( hoveringOver=='9' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('9')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                        </motion.div>}
                        {tab=="right" && <div className={`${styles.bodyMain} ${styles.friendships}`}>
                            <FriendshipCard name="Gourang Rayalwar" friendsInCommon="5" key='1'  enableBlur={( hoveringOver=='1' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('1')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Ravi Rathore" friendsInCommon="5" key='2' enableBlur={( hoveringOver=='2' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('2')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='3' enableBlur={( hoveringOver=='3' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('3')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Pratik Kurhe" friendsInCommon="5" key='4' enableBlur={( hoveringOver=='4' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('4')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Shourya Rayalwar" friendsInCommon="5" key='5' enableBlur={( hoveringOver=='5' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('5')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Sheetal Rayalwar" friendsInCommon="5" key='6' enableBlur={( hoveringOver=='6' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('6')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Rohan Rayalwar" friendsInCommon="5" key='7' enableBlur={( hoveringOver=='7' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('7')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Gotu Dada" friendsInCommon="5" key='8' enableBlur={( hoveringOver=='8' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('8')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Yogu Dada" friendsInCommon="5" key='9' enableBlur={( hoveringOver=='9' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('9')} handleHoveringStop={()=>setHoveringOver(null)} />
                        </div>}
                    </motion.section>
                </div>
            </div>
        </>
    )
}