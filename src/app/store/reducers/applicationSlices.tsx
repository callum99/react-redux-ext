import { CounterSlice } from "./counterSlice";
import { StoreSliceType } from "src/app/global.types";

export const ApplicationSlices: StoreSliceType = {
    counter: CounterSlice
    // any future slices to be added here
};
