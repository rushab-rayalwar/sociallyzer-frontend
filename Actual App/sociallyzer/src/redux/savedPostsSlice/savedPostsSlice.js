import { createSlice } from "@reduxjs/toolkit";

import fetchSavedPosts from "./savedPostsThunk.js";

const INITIAL_STATE = {
    data:[],
    loading:false,
    errors:[]
}

const savedPosts = createSlice({
    name:"savedPosts",
    initialState: INITIAL_STATE,
    reducers:{

    },
    extraReducers : (builder)=>{
        builder
            .addCase(fetchSavedPosts.fulfilled,(state, action)=>{
                console.log("FULFILLED")
                state.data = action.payload.data.accessiblePosts;
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


export default savedPosts.reducer;