// third party
import { configureStore } from "@reduxjs/toolkit";

// local imports
import userReducer from "./user/userSlice.js";
import filterOptionsReducer from "./filterOptions/filterOptionsSlice.js";
import feedPostsReducer from "./feedPosts/feedPostsSclice.js";
import savedPostsReducer from "./savedPostsSlice/savedPostsSlice.js";

const store = configureStore({
    reducer : {
        user : userReducer,
        filterOptions : filterOptionsReducer,
        feedPosts : feedPostsReducer,
        savedPosts : savedPostsReducer
    }
});

export default store;