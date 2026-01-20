// third party
import { configureStore } from "@reduxjs/toolkit";

// local imports
import userReducer from "./user/userSlice.js";
import filterOptionsReducer from "./filterOptions/filterOptionsSlice.js";

const store = configureStore({
    reducer : {
        user : userReducer,
        filterOptions : filterOptionsReducer
    }
});

export default store;