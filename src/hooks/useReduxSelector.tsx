import React, { useEffect, useState } from 'react';
import { ReduxStore } from '../app/store/reduxSingletonInstance';
import { isPrimitiveType } from "../utils/isPrimitiveType";

export const useReduxSelector = (selector: (state:any) => any ) => {
    const Redux = ReduxStore.get();
    const [ selectedValue, setSelectedValue ] = useState(selector(Redux.getState()));

    useEffect(() => {
        const unsubscribe = Redux.subscribe(() => {
            const selectorValue = selector(Redux.getState());

            const stateValueHasChanged = () => {
                if (!isPrimitiveType(selectorValue) || !isPrimitiveType(selectedValue)) {
                    return JSON.stringify(selectedValue) !== JSON.stringify(selectorValue);
                }

                return (selectedValue !== selectorValue);
            }

            if (stateValueHasChanged()) {
                setSelectedValue(selectorValue);
            }
        });

        return unsubscribe;
    }, []);

    return [selectedValue, Redux.dispatch.bind(Redux)];
};
