import { createSlice } from "@reduxjs/toolkit";

import {fetchUserPosts, createPost} from "./userPostsThunk.js";
import { commentAdded, commentRemoved } from "../posts/postActions.js";
import { likeToggled, saveToggled } from "../posts/postActions.js";

const INITIAL_STATE = {
    data : [],
    loading : false,
    errors : []
}

const userPostsSlice = createSlice({
    name : "userPosts",
    initialState : INITIAL_STATE,
    reducers : {
        
    },
    extraReducers : (builder)=>{
        builder
            .addCase(fetchUserPosts.fulfilled, (state, action)=>{
                console.log("FULFILLED");
                state.data = action.payload;
                state.loading = false;
                console.log("Posts fetched", action.payload);
            })
            .addCase(fetchUserPosts.rejected, (state, action)=>{
                console.log("REJECTED");
                state.errors = action.payload;
                state.loading = false;
                console.log("error in loading user posts", state.errors);
            })
            .addCase(fetchUserPosts.pending, (state, action)=>{
                console.log("PENDING")
                state.loading = true;
            })
            // create post
            .addCase(createPost.pending, (state)=>{
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action)=>{
                state.loading = false;
                state.data = [action.payload, ...state.data];
            })
            .addCase(createPost.rejected, (state, action)=>{
                state.loading = false;
                state.errors = action.payload;
            })
            // comment
            .addCase(commentAdded, (state, action)=>{
                console.log("Comment added in userPosts slice");

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
            // save
            .addCase(saveToggled, (state, action)=>{
                state.data = state.data.map(p=>{
                    if( String(p._id) === String(action.payload) ){
                        return {
                            ...p,
                            isBookmarked : !p.isBookmarked
                        }
                    }
                    return p;
                });
            })
    }
});

// export const {toggleLikeInUserPostSliceOptimistic, toggleSaveInUserPostSliceOptimistic} = userPostsSlice.actions;
export default userPostsSlice.reducer;