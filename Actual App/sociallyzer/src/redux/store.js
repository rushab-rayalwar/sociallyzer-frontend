// third party
import { configureStore } from "@reduxjs/toolkit";

// local imports
import userReducer from "./user/userSlice.js";

const store = configureStore({
    reducer : {
        user : userReducer
    }
});

export default store;