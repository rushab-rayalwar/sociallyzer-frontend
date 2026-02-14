import { createSlice } from "@reduxjs/toolkit";

import fetchSavedPosts from "./savedPostsThunk.js";
import { commentAdded, commentRemoved} from "../posts/postActions.js";
import { likeToggled, saveToggled } from "../posts/postActions.js";

const INITIAL_STATE = {
    data:[],
    loading:false,
    errors:[]
}

const savedPostsSlice = createSlice({
    name:"savedPosts",
    initialState: INITIAL_STATE,
    reducers:{
        toggleSavedPostInSavedPostSliceOptimistic : (state, action)=>{ // action.payload contains the post object to be saved
            let postInState = state.data.find(p=>String(p._id) == String(action.payload._id));
            console.log("postInState",postInState);
            if(!postInState){
                state.data.unshift({...action.payload, isBookmarked:true}); // optimistically add post to the state
            } else {
                state.data = state.data.filter(p=>String(p._id) != String(action.payload._id));
            }
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(fetchSavedPosts.fulfilled,(state, action)=>{
                console.log("FULFILLED", action.payload);
                state.data = action.payload.data.accessiblePosts ?? []; // the whole state gets replaced with the updated data from the backend
                state.loading = false;
                state.errors = [];
            })
            .addCase(fetchSavedPosts.rejected, (state, action)=>{
                console.log("REJECTED")
                state.errors = action.payload;
                state.loading = false;
            })
            .addCase(fetchSavedPosts.pending, (state, action)=>{
                console.log("PENDING")
                state.loading = true;
            })
            // comment
            .addCase(commentAdded, (state, action)=>{
                console.log("Comment added in savedPosts slice");
                state.data = state.data.map(p=>{
                    if( String(p._id) === String(action.payload) ){
                        return {
                            ...p,
                            commentsCount : p.commentsCount+1
                        }
                    }
                    return p;
                })
            })
            .addCase(commentRemoved, (state, action)=>{
                state.data = state.data.map(p=>{
                    if( String(p._id) === String(action.payload) ){
                        return {
                            ...p,
                            commentsCount : p.commentsCount-1
                        }
                    }
                    return p;
                })
            })
            // like 
            .addCase(likeToggled, (state,action)=>{
                state.data = state.data.map(p=>{
                    if( String(p._id) === String(action.payload) ){
                        console.log("Like is being toggled");
                        return {
                            ...p,
                            isLiked : !p.isLiked,
                            likesCount : p.isLiked ? p.likesCount-1 : p.likesCount+1
                        }
                    }
                    return p;
                })
            })
    }
});

export const {toggleSavedPostInSavedPostSliceOptimistic} = savedPostsSlice.actions;
export default savedPostsSlice.reducer;