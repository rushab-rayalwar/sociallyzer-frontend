// third party
import { configureStore } from "@reduxjs/toolkit";

// local imports
import userReducer from "./features/user/userSlice.js";
import filterOptionsReducer from "./features/filterOptions/filterOptionsSlice.js";
import feedPostsReducer from "./features/feedPosts/feedPostsSclice.js";
import savedPostsReducer from "./features/savedPostsSlice/savedPostsSlice.js";
import userPostsReducer from "./features/userPosts/userPostsSlice.js";

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