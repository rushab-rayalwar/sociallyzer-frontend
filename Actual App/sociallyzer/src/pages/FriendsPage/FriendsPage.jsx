//external imports
import {motion} from "framer-motion";
import { useState } from "react";

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
    const [hoveringOver, setHoveringOver] = useState(null);
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
                    transition={{type:"spring", stiffness:120, damping:10, mass:0.9}}
                    >
                        <div className={styles.bodyHeader}>
                            <div className={tab=="left" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>setTab('left')}>
                                Manage Requests
                            </div>
                            <div className={tab=="right" ? `${styles.bodyTabName} ${styles.selected}` : styles.bodyTabName} onClick={()=>setTab('right')}>
                                Manage Friendships
                            </div>
                        </div>
                        {tab=="left" && <div className={`${styles.bodyMain} ${styles.requests}`}>
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                            <FriendRequest name="John Doe" friendsInCommon="5"/>
                            
                        </div>}
                        {tab=="right" && <div className={`${styles.bodyMain} ${styles.friendships}`}>
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='1'  enableBlur={( hoveringOver=='1' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('1')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='2' enableBlur={( hoveringOver=='2' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('2')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='3' enableBlur={( hoveringOver=='3' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('3')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='4' enableBlur={( hoveringOver=='4' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('4')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='5' enableBlur={( hoveringOver=='5' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('5')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='6' enableBlur={( hoveringOver=='6' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('6')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='7' enableBlur={( hoveringOver=='7' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('7')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='8' enableBlur={( hoveringOver=='8' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('8')} handleHoveringStop={()=>setHoveringOver(null)} />
                            
                            <FriendshipCard name="Tatya Vinchu" friendsInCommon="5" key='9' enableBlur={( hoveringOver=='9' || hoveringOver==null ) ? false : true } handleHovering={()=>setHoveringOver('9')} handleHoveringStop={()=>setHoveringOver(null)} />
                        </div>}
                    </motion.section>
                </div>
            </div>
        </>
    )
}