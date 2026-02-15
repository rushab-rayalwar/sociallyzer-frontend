import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const fetchFeedPosts = createAsyncThunk("feedPosts", async (cursor=null, thunkAPI)=>{
    try {
        let url = !cursor ? `${import.meta.env.VITE_BACKEND_URL}/api/feed` : `${import.meta.env.VITE_BACKEND_URL}/api/feed?cursor=${cursor}`; // cursor is a date string
        let res = await axios.get(url, {withCredentials:true});
        let dataReceived = res.data;
        return dataReceived.data;
    } catch(error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data?.errors || ["Something went wrong when fetching feedPosts!"])
    }
});

export default fetchFeedPosts;