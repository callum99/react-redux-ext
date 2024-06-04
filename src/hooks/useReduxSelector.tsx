import React, { useEffect, useState } from 'react';
import { ReduxSingletonInstance } from '../app/store/reduxSingletonInstance';
import { isNonPrimitiveType } from "../utils/isPrimitiveType";

export const useReduxSelector = (selector: (state:any) => any ) => {
    const ReduxInstanceGetter = ReduxSingletonInstance.get();
    const [ selectedValue, setSelectedValue ] = useState(selector(ReduxInstanceGetter.getState()));

    useEffect(() => {
        const unsubscribe = ReduxInstanceGetter.subscribe(() => {
            const selectorValue = selector(ReduxInstanceGetter.getState());

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

    return [selectedValue, ReduxInstanceGetter.dispatch.bind(ReduxSingletonInstance)];
};
