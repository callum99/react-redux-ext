import { createAction, createSlice } from '@reduxjs/toolkit'
import { DECREMENT, INCREMENT } from "./actions/actions.const";
import { DispatchActionType } from 'src/app/global.types';

export const CounterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increment: (state, action: DispatchActionType<any>) => {
            state.count += (action.payload || 1);
        },
        decrement: (state, action: DispatchActionType<any>) => {
            state.count -= (action.payload || 1);
        }
    }
});

export const IncrementAction = createAction<number | undefined>(INCREMENT);
export const DecrementAction = createAction<number | undefined>(DECREMENT);
