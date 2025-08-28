// external imports
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    general: true,
    closeFriends: true,
    innerCircle : true
}

const filtersSlice = createSlice({
    name:"filters",
    initialState:INITIAL_STATE,
    reducers:{
        toggleFilter:(state, action)=>{
            state[action.payload] = !state[action.payload];
        }
    }
});

export const filterReducer = filtersSlice.reducer;
export const filterActions = filtersSlice.actions;