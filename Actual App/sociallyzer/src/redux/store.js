import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    data : {
        isLoggedIn : false,
        name : "",
        email : ""
    }
}

const userSlice = createSlice({
    name:"user",
    initialState : INITIAL_STATE,
    reducers : {
        
    }
});