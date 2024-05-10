import { Slice } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";

export const rootReducers: { [key: string]: Slice } = {
    counter: counterSlice
    // any future slices will be added here
};

export default  rootReducers;
