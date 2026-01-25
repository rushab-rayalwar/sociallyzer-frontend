import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const fetchFeedPosts = createAsyncThunk("feedPosts", async (_, thunkAPI)=>{
    try {
        let res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/feed/",{withCredentials:true});
        let dataReceived = res.data;
        return dataReceived.data;
    } catch(error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response?.data?.errors || ["Something went wrong when fetching feedPosts!"])
    }
});

export default fetchFeedPosts;