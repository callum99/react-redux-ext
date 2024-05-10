import React from 'react';
import Button from "../default/button";
import { getReduxStoreProperties } from "../../../app/store/storeContext";
import { ButtonType } from "../button.types";
import { incrementAction } from "../../../app/store/reducers/counterSlice";

const IncreaseButton = ({ btnText }: ButtonType) => {
    const store = getReduxStoreProperties();

    return (
        <Button btnOnClick={() => store.dispatchReact(incrementAction())} btnText={btnText} />
    );
};

export default IncreaseButton;
