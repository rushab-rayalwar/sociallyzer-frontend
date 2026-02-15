import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AddPost.module.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { createPost } from "../../redux/features/userPosts/userPostsThunk";

export default function AddPost(){
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null); 
    const [preview, setPreview] = useState(null); // stores the url for preview of the image uploaded by the user
    const [reqErrors, setReqErrors] = useState([]);

    const [visibilityOptions, setVisibilityOptions] = useState({
        public:true,
        general:true,
        closeFriends:true,
        innerCircle:true
    }); 

    const fileInputRef = useRef();
    const lastPostRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors } = useSelector(state => state.userPosts);

    function handleImageChange(e){ // NOTE THIS : this is how image uploaded by the user can be managed and accessed by JS
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        if(!image || !caption){
            setReqErrors(["Add post image and content!"]);
            return;
        }

        const formData = new FormData(); // NOTE THIS : this is how form data is handled
        const visibilityMap = {
            public:'public',
            general:'general',
            closeFriends:'close_friend',
            innerCircle:'inner_circle'
        }
        // Filter the visibility options that are active (true) and map them to their corresponding backend values
        const visibility = Object.keys(visibilityOptions).filter(key => visibilityOptions[key]).map(key => visibilityMap[key]); console.log(JSON.stringify(visibility));
        formData.append("visibility", JSON.stringify(visibility)); // NOTE THIS : JSON.stringify is used to convert the visibility array to a JSON string which is then parsed at the backend using express.json() middleware
        formData.append("content", caption);
        if(image){
            formData.append("image", image);
        }
        const result = await dispatch(createPost(formData)); // NOTE THIS : In case of dispatching async thunks, dispatch returns a promise which resolves to whatever the thunk returns. In case of dispatching normal action creators, dispatch returns the action object itself.
        // console.log("not awaited");
        if(createPost.fulfilled.match(result)){ // NOTE THIS : the match method belongs to JS and uses regex to compare strings
            setCaption("");
            setImage(null);
            setPreview(null);
            navigate("/home"); // Redirect to home on success
        }
    }

    function handleVisibilityChange(option){
        switch(option){
            case 'general':
                setVisibilityOptions(prev=>{
                    return {
                        ...prev,
                        general:!prev.general,
                        public : prev.general ? false : prev.public
                    }
                });
                break;
            case 'closeFriends':
                setVisibilityOptions(prev=>{
                    return {
                        ...prev,
                        closeFriends:!prev.closeFriends,
                        public : prev.closeFriends ? false : prev.public
                    }
                });
                break;
            case 'innerCircle':
                setVisibilityOptions(prev=>{
                    return {
                        ...prev,
                        innerCircle:!prev.innerCircle,
                        public : prev.innerCircle ? false : prev.public
                    }
                });
                break;
            case 'public':
                setVisibilityOptions(prev=>{
                    return {
                        public:!prev.public,
                        general:!prev.public ? true : prev.general,
                        closeFriends:!prev.public ? true : prev.closeFriends,
                        innerCircle:!prev.public ? true : prev.innerCircle
                    }
                });
                break;
        }
    }

    return (
        <>
            <div className={styles.addPostPageContainer}>
                <div className={styles.background}>
                    <Header/>
                    <Navbar active="addPost"/>
                    
                    <section className={styles.formContainer}>
                        <div className={styles.form}>
                            <div className={styles.formHeader}> 
                                Create New Post 
                            </div>
                            <form className={styles.postForm} onSubmit={handleSubmit}>
                                <div className={styles.imageUploadContainer}>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                        style={{display: 'none'}}
                                    />
                                    <button 
                                        type="button" 
                                        className={styles.uploadBtn}
                                        onClick={()=>fileInputRef.current.click()}
                                    >
                                        {image ? "Change Image" : "Add Image"}
                                    </button>
                                </div>
                                
                                {preview && (
                                    <div className={styles.imagePreview}>
                                        <img src={preview} alt="Preview" />
                                        <button 
                                            type="button" 
                                            className={styles.removeImageBtn}
                                            onClick={()=>{
                                                setImage(null);
                                                setPreview(null);
                                                fileInputRef.current.value = null; // Reset file input
                                            }}
                                        >
                                            x
                                        </button>
                                    </div>
                                )}
                                <div className={styles.inputGroup}>
                                    <textarea 
                                        className={styles.textArea} 
                                        placeholder="What's on your mind?"
                                        value={caption}
                                        onChange={(e)=>setCaption(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className={styles.visibilityOptionsContainer}>
                                    <div className={styles.visibilityOption} onClick={()=>handleVisibilityChange('general')}>
                                        <span>General</span>
                                        <div className={styles.dotContainer}>
                                            {visibilityOptions.general && <div className={styles.dot}></div>}
                                        </div>
                                    </div>
                                    <div className={styles.visibilityOption} onClick={()=>handleVisibilityChange('closeFriends')}>
                                        <span>Close Friends</span>
                                        <div className={styles.dotContainer}>
                                            {visibilityOptions.closeFriends && <div className={styles.dot}></div>}
                                        </div>
                                    </div>
                                    <div className={styles.visibilityOption} onClick={()=>handleVisibilityChange('innerCircle')}>
                                        <span>Inner Circle</span>
                                        <div className={styles.dotContainer}>
                                            {visibilityOptions.innerCircle && <div className={styles.dot}></div>}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.postAsPublicButton} onClick={()=>handleVisibilityChange('public')}>
                                    <div className={styles.squareContainer}>
                                        {
                                            visibilityOptions.public && <div className={styles.square}></div>
                                        }
                                    </div>
                                    <span>Post as Public</span>
                                </div>

                                {
                                    errors && errors.length > 0 && (
                                        <div className={styles.errorContainer}>
                                            {errors.map((err, index) => <p key={index} className={styles.errorText}>{err}</p>)}
                                        </div>
                                    )
                                }
                                {
                                    reqErrors && reqErrors.length > 0 && (
                                        <div className={styles.errorContainer}>
                                            {reqErrors.map((err, index) => <p key={index} className={styles.errorText}>{err}</p>)}
                                        </div>
                                    )
                                }

                                <button type="submit" className={styles.submitBtn} disabled={loading}>
                                    <div className={styles.glass} style={{borderRadius : "0.5rem"}}></div>
                                    <span>{loading ? "Posting..." : "Post"}</span>
                                    <div className={styles.buttonHoverBG}></div>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
                <AnimatePresence mode="wait">
                    <Outlet /> 
                </AnimatePresence>
            </div>
        </>
    )
}