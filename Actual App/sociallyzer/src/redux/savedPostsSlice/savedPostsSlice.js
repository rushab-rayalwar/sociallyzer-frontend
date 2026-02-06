import { createSlice } from "@reduxjs/toolkit";

import fetchSavedPosts from "./savedPostsThunk.js";

const INITIAL_STATE = {
    data:[],
    loading:false,
    errors:[]
}

const savedPostsSlice = createSlice({
    name:"savedPosts",
    initialState: INITIAL_STATE,
    reducers:{
        toggleSavedPostOptimistic : (state, action)=>{ // action.payload contains the post object to be saved
            let postInState = state.data.find(p=>String(p._id) == String(action.payload._id));
            if(!postInState){
                state.data.unshift(action.payload); // optimistically add post to the state
            } else {
                state.data = state.data.filter(p=>String(p._id) != String(action.payload._id));
            }
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(fetchSavedPosts.fulfilled,(state, action)=>{
                console.log("FULFILLED", action.payload);
                state.data = action.payload.data.accessiblePosts || []; // the whole state gets replaced with the updated data from the backend
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
    }
});

export const {toggleSavedPostOptimistic} = savedPostsSlice.actions;
export default savedPostsSlice.reducer;