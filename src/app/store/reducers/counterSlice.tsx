import {createAction, createSlice} from '@reduxjs/toolkit'
import {DECREMENT, INCREMENT, INCREMENT_BY_AMOUNT} from "./actions/actions.const";

interface CounterState {
    value: number
}

const initialState:CounterState = {
    value: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
        },
        reservedIncrementReadOnly: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    }
});

export const incrementAction = createAction(INCREMENT);
export const decrementAction = createAction(DECREMENT);
export const incrementByAmountAction = createAction(INCREMENT_BY_AMOUNT);
export default counterSlice.reducer;
