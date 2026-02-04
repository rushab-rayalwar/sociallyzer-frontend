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

export default feedPostsSlice.reducer;