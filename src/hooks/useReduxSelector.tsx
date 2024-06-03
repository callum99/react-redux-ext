import React, { useEffect, useState } from 'react';
import { ReduxSingletonInstance } from '../app/store/reduxSingletonInstance';

export const useReduxSelector = (selector: (state: any) => any ) => {
    const [ selectedValue, setSelectedValue ] = useState(selector(ReduxSingletonInstance.get().getState()));

    useEffect(() => {
        const unsubscribe = ReduxSingletonInstance.get().subscribe(() => {
            const selectorValue = selector(ReduxSingletonInstance.get().getState());

            if (selectedValue !== selectorValue) {
                setSelectedValue(selectorValue);
            }
        });

        return unsubscribe;
    }, [selectedValue]);

    return [selectedValue, ReduxSingletonInstance.get().dispatch.bind(ReduxSingletonInstance)];
};
