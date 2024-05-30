import React from 'react';
import { ButtonType } from "./button.types";

export const Button = ({ btnText, btnOnClick }:ButtonType) => {
    return (
        <button onClick={() => btnOnClick ? btnOnClick() : {}}>{btnText}</button>
    );
};
