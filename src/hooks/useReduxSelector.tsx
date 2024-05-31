import React, { useEffect, useState } from 'react';
import { ReduxSingletonInstance } from '../app/store/reduxSingletonInstance';

export const useReduxSelector = (selector: (state: any) => any ) => {
    const [ selectedValue, setSelectedValue ] = useState(selector(ReduxSingletonInstance.get().getState()));

    useEffect(() => {
        const unsubscribe = ReduxSingletonInstance.get().subscribe(() => {
            if (selectedValue !== ReduxSingletonInstance.get().getState()) {
                setSelectedValue(selector(ReduxSingletonInstance.get().getState()));
            }
        });

        return unsubscribe;
    }, []);

    return [selectedValue, ReduxSingletonInstance.get().dispatch.bind(ReduxSingletonInstance)];
};
