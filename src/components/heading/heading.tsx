import React from 'react';
import { HeadingTypes } from "./heading.types";
import { useReduxSelector } from "../../hooks/useReduxSelector";

export const Heading = ({ headingText, className }: HeadingTypes) => {
    const [countValue] = useReduxSelector((state) => state.counter.count);

    return (<div>
        <h1 className={className}>{headingText}</h1>
        <p className={"font-sans text-primary-200 font-light text-lg p-[0px] m-[0px]"}>Count: {countValue}</p>
    </div>);
};
