// third party
import { configureStore } from "@reduxjs/toolkit";

// local imports
import userReducer from "./user/userSlice.js";
import filterOptionsReducer from "./filterOptions/filterOptionsSlice.js";
import feedPostsReducer from "./feedPosts/feedPostsSclice.js";
import savedPostsReducer from "./savedPostsSlice/savedPostsSlice.js";
import userPostsReducer from "./userPosts/userPostsSlice.js";

const store = configureStore({
    reducer : {
        user : userReducer,
        filterOptions : filterOptionsReducer,
        feedPosts : feedPostsReducer,
        savedPosts : savedPostsReducer,
        userPosts : userPostsReducer
    }
});

export default store;