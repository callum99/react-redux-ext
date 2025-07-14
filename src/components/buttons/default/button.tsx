import React from 'react';
import { ButtonType } from "./button.types";

export const Button = ({ disabled, type, btnText, btnOnClick, className }:ButtonType) => {
    return (
        <button disabled={disabled} type={type} className={className} onClick={(e) => btnOnClick ? btnOnClick(e) :{}}>{btnText}</button>
    );
};
