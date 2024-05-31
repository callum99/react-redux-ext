import React from 'react';
import { HeadingTypes } from "./heading.types";
import { useReduxSelector } from "../../hooks/useReduxSelector";

export const Heading = ({ headingText }: HeadingTypes) => {
    const [countValue] = useReduxSelector((state) => state.counter.count);

    return (<h1>{headingText}, count:{countValue}</h1>);
};
