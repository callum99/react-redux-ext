import { createAction, createSlice } from '@reduxjs/toolkit'
import { DECREMENT, INCREMENT } from "./actions/actions.const";
import { DispatchActionType } from 'src/app/global.types';

const initialState: { count: number } = {
    count: 0
};

export const CounterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action: DispatchActionType<number | undefined>) => {
            state.count += (action.payload || 1);
        },
        decrement: (state, action: DispatchActionType<number | undefined>) => {
            state.count -= (action.payload || 1);
        }
    }
});

export const IncrementAction = createAction<number | undefined>(INCREMENT);
export const DecrementAction = createAction<number | undefined>(DECREMENT);
