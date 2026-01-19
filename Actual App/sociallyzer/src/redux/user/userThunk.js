import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = createAsyncThunk("user/loginUser",async (data, thunkAPI)=>{
    try{
        let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signin`,data,{withCredentials:true});
        let dataReceived = res.data.data;
        return dataReceived;
    } catch(error) {
        // return error.response.data; ---> NOTE : dont do this, this resolves the promise with the errors, which is caught by the .fulfilled extraReducer
        console.log("ERROR IN THUNK",error);
        return thunkAPI.rejectWithValue(error.response?.data?.errors || ["Login Failed"]);
    }
});

export {loginUser};