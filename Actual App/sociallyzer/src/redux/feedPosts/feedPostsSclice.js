import { createSlice } from "@reduxjs/toolkit";

import fetchFeedPosts from "./filterPostsThunk";

const INITIAL_STATE = {
    data : [],
    loading : false,
    errors: []
}

const feedPostsSlice = createSlice({
    name : "feedPosts",
    initialState : INITIAL_STATE,
    reducers : {
        toggleLikeInFeedSliceOptimistic : (state, action)=>{ // NOTE THIS : this action is triggered when the 'toggle like' request successfully gets executed at the server. This action's purpose is to keep the posts state and likes state in sync with each other.
            state.data = state.data.map(p=>{
                if( String(p._id) === String(action.payload) ){
                    return {
                        ...p, 
                        isLiked : !p.isLiked,
                        likesCount : (p.isLiked ? p.likesCount-1 : p.likesCount+1)
                    };
                }
                return p;
            })
        },
        toggleSaveInFeedSliceOptimistic : (state, action)=>{
            state.data = state.data.map(p=>{
                if(String(p._id) === String(action.payload)){
                    return{
                        ...p,
                        isBookmarked : !p.isBookmarked
                    }
                }
                return p;
            })
        }
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
    }
});

export const {toggleLikeInFeedSliceOptimistic, toggleSaveInFeedSliceOptimistic} = feedPostsSlice.actions;
export default feedPostsSlice.reducer;