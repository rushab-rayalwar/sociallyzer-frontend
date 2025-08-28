// external imports
import { configureStore } from "@reduxjs/toolkit";

// local imports
import { filterReducer } from "./filtersReducer.js";

export const store = configureStore({
    reducer:{
        filters: filterReducer
    }
});