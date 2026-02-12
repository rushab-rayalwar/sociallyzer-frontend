//third party
import { createSlice } from "@reduxjs/toolkit";

//local imports
import { loginUser } from "./userThunk.js";

const INITIAL_STATE = {
    loggedIn : false,
    email : "",
    name : "",
    _id : "",
    loggingIn : false,
    errors : []
}

const userSlice = createSlice({ 
    name : "user",
    initialState : INITIAL_STATE,
    reducers : {
        addError : (state, action)=>{
            state.errors.push(action.payload);
        }
    },
    extraReducers : builder => {
        builder.
            addCase(loginUser.fulfilled, (state, action)=>{
                console.log("Login Fulfilled");
                state.loggedIn = true;
                state.email = action.payload.email;
                state.name = action.payload.name;
                state._id = action.payload._id;
                state.loggingIn = false;
                state.errors = [];
            })
            .addCase(loginUser.rejected, (state, action)=>{
                console.log("Login Rejected");
                state.loggedIn = false;
                state.email = "";
                state.name = "";
                state._id = "";
                state.loggingIn = false;
                console.log("Action.payload in .rejected", action.payload);
                // NOTE THIS :
                // action.payload is populated ONLY when the thunk is rejected via thunkAPI.rejectWithValue()
                // Otherwise (thrown errors, network failures, unexpected exceptions),
                // error details live in action.error;

                let errors = action.payload ?? [action.error?.message || "Loading Failed!"]
                errors.forEach(e=>state.errors.push(e));
            })
            .addCase(loginUser.pending, (state, action)=>{
                console.log("Login Pending");
                state.loggingIn = true;
                state.errors = [];
            })
    }
});

export const {addError} = userSlice.actions;
export default userSlice.reducer;