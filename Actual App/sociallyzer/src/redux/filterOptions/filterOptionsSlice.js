import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    general : true,
    closeFriends : true,
    innerCircle : true
}

const filterOptionsSlice = createSlice({
    name:"filterOptions",
    initialState : INITIAL_STATE,
    reducers : {
        toggleFilter : (state, action)=>{
            let key = action.payload;
            if(key in state){ // NOTE THIS
                state[action.payload] = !state[action.payload];
            }
        }
    }
});

export const {toggleFilter} = filterOptionsSlice.actions;
export default filterOptionsSlice.reducer;