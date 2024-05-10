import React from 'react';
import Button from "../default/button";
import { getReduxStoreProperties } from "../../../app/store/storeContext";
import { ButtonType } from "../button.types";
import { decrementAction } from "../../../app/store/reducers/counterSlice";

const DecreaseButton = ({ btnText }: ButtonType) => {
    const store = getReduxStoreProperties();

    return (
        <Button btnOnClick={() => store.dispatchReact(decrementAction())} btnText={btnText} />
    );
};

export default DecreaseButton;
