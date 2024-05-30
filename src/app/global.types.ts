import { Slice } from "@reduxjs/toolkit";

export interface DispatchActionType<Type> {
    type: string,
    payload?: Type
};

export interface StoreSliceType {
    [key: string]: Slice,
};
