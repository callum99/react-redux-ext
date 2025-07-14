import React from 'react';
import { Button } from '../default/button';
import { ButtonType } from '../default/button.types';
import { DecrementAction } from "../../../app/store/reducers/counterSlice";
import { useReduxDispatcher } from '../../../hooks/useReduxDispatcher';

export const DecreaseButton = ({ btnText }: ButtonType) => {
    const dispatch = useReduxDispatcher();

    return (<Button className={"font-sans text-sm border-t-2 border-r-2 border-l-2 border-b-3 border-light-300 text-light-950 font-bold bg-light-200 rounded-md t m-[10px] w-[200px] h-[40px] p-[5px]"} btnOnClick={() => dispatch(DecrementAction())} btnText={btnText} />);
};
