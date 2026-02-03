import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchSavedPosts = createAsyncThunk("savedPosts", async (_, thunkAPI)=>{
    try{
        const response = await axios.get(import.meta.env+'/api/saved-posts/',{withCredentials:true});
        const savedPosts = response.data;
        return savedPosts;
    } catch(error){
        console.log("ERROR LOADING SAVED POSTS:", error);
        return thunkAPI.rejectWithValue(error.response?.data?.errors || ["Something went wrong when fetching posts!"])
    }
});

export default fetchSavedPosts;