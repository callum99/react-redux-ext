import React, { useEffect, useState } from 'react';
import { ReduxStore } from '../app/store/reduxSingletonInstance';
import { isNonPrimitiveType } from "../utils/isPrimitiveType";

export const useReduxSelector = (selector: (state:any) => any ) => {
    const ReduxStoreGetter = ReduxStore.get();
    const [ selectedValue, setSelectedValue ] = useState(selector(ReduxStoreGetter.getState()));

    useEffect(() => {
        const unsubscribe = ReduxStoreGetter.subscribe(() => {
            const selectorValue = selector(ReduxStoreGetter.getState());

            const stateValueHasChanged = () => {
                if (isNonPrimitiveType(selectorValue) || isNonPrimitiveType(selectedValue)) {
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

    return [selectedValue, ReduxStoreGetter.dispatch.bind(ReduxStore)];
};
