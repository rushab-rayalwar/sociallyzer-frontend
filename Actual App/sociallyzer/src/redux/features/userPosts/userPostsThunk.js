import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserPosts = createAsyncThunk("userPosts/fetch", async (_, thunkAPI)=>{
    try{
        
        let url = `${import.meta.env.VITE_BACKEND_URL}/api/posts`
        let response = await axios.get(url,{withCredentials:true});
        let data = response.data;
        return data.data;
    } catch(error){
        return thunkAPI.rejectWithValue(error.response?.data?.errors || ["Something went wrong while loading user posts"]);
    }
});

export const createPost = createAsyncThunk("userPosts/create", async (formData, thunkAPI)=>{
    try{
        let response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/posts", formData, {
            withCredentials:true
        });
        let data = response.data;
        return data.data;
    } catch(error){
        console.log("Error in creating post",error);
        return thunkAPI.rejectWithValue(error.response?.data?.errors || ["Something went wrong while creating the post"]);
    }
});