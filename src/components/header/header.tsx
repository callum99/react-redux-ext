import React from 'react';
import { getReduxStoreProperties } from "../../app/store/storeContext";
import { HeadingTypes } from "./header.types";

const Heading = ({ headingText }: HeadingTypes) => {
    const store = getReduxStoreProperties();

    return (<h1>{headingText}, count: {store.getStateReact().counter.value}</h1>);
};

export default Heading;
