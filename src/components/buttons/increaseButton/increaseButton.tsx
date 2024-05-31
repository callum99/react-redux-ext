import React from 'react';
import { Button } from '../default/button';
import { ButtonType } from '../default/button.types';
import { IncrementAction } from "../../../app/store/reducers/counterSlice";
import { useReduxDispatcher } from '../../../hooks/useReduxDispatcher';

export const IncreaseButton = ({ btnText }: ButtonType) => {
    const dispatch = useReduxDispatcher();

    return (<Button btnOnClick={() => dispatch(IncrementAction())} btnText={btnText} />);
};
