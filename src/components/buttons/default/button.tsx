import React from 'react';
import { ButtonType } from "../button.types";

const Button = ({ btnText, btnOnClick }:ButtonType) => {
    return (
        <button onClick={() => btnOnClick ? btnOnClick() : {}}>{btnText}</button>
    );
};

export default Button;
