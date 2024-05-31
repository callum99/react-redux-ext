import React from 'react';
import { Button } from '../default/button';
import { ButtonType } from '../default/button.types';
import { DecrementAction } from "../../../app/store/reducers/counterSlice";
import { useReduxDispatcher } from '../../../hooks/useReduxDispatcher';

export const DecreaseButton = ({ btnText }: ButtonType) => {
    const dispatch = useReduxDispatcher();

    return (<Button btnOnClick={() => dispatch(DecrementAction())} btnText={btnText} />);
};
