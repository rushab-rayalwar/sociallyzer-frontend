import { createSlice } from "@reduxjs/toolkit";

import fetchFeedPosts from "./filterPostsThunk";
import { commentAdded, commentRemoved } from "../posts/postActions.js";
import { likeToggled, saveToggled } from "../posts/postActions.js";

const INITIAL_STATE = {
    data : [],
    loading : false,
    errors: []
}

const feedPostsSlice = createSlice({
    name : "feedPosts",
    initialState : INITIAL_STATE,
    reducers : {
        // toggleSaveInFeedSliceOptimistic : (state, action)=>{
        //     state.data = state.data.map(p=>{
        //         if(String(p._id) === String(action.payload)){
        //             return{
        //                 ...p,
        //                 isBookmarked : !p.isBookmarked
        //             }
        //         }
        //         return p;
        //     })
        // }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(fetchFeedPosts.pending, (state)=>{
                console.log("PENDING");
                state.loading = true;
            })
            .addCase(fetchFeedPosts.rejected, (state, action)=>{
                console.log("REJECTED");
                state.errors = action.payload;
                state.loading = false;
            })
            .addCase(fetchFeedPosts.fulfilled, (state, action)=>{
                console.log("FULFILLED", action.payload);
                state.data = action.payload;
                state.loading = false;
                state.errors = [];
            })
            // comment
            .addCase(commentAdded, (state, action)=>{
                state.data = state.data.map(p=>{
                    if( String(p._id) === String(action.payload._id) ){
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

// export const {toggleLikeInFeedSliceOptimistic, toggleSaveInFeedSliceOptimistic} = feedPostsSlice.actions;
export default feedPostsSlice.reducer;