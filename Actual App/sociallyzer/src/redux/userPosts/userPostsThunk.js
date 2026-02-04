import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUserPosts = createAsyncThunk("userPosts", async (_, thunkAPI)=>{
    try{
        let response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/posts",{withCredentials:true});
        let data = response.data;
        return data.data;
    } catch(error){
        return thunkAPI.rejectWithValue(error.response?.data?.errors || ["Something went wrong while loading user posts"]);
    }
});

export default fetchUserPosts;