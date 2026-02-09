import { createSlice } from "@reduxjs/toolkit";

import fetchUserPosts from "./userPostsThunk.js";

const INITIAL_STATE = {
    data : [],
    loading : false,
    errors : []
}

const userPostsSlice = createSlice({
    name : "userPosts",
    initialState : INITIAL_STATE,
    reducers : {
        toggleLikeInUserPostSliceOptimistic : (state, action)=>{
            state.data = state.data.map(p=>{
                if( String(p._id) === String(action.payload) ){
                    return {
                        ...p,
                        isLiked : !p.isLiked,
                        likesCount : (p.isLiked ? p.likesCount-1 : p.likesCount+1)
                    }
                }
                return p;
            });
        },
        toggleSaveInUserPostSliceOptimistic : (state, action)=>{
            state.data = state.data.map((p)=>{
                if( String(p._id) === String(action.payload) ){
                    return {
                        ...p,
                        isBookmarked : !p.isBookmarked,
                    }
                }
            });
        }
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
    }
});

export const {toggleLikeInUserPostSliceOptimistic, toggleSaveInUserPostSliceOptimistic} = userPostsSlice.actions;
export default userPostsSlice.reducer;