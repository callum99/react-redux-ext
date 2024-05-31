import React, { useEffect, useState } from 'react';
import { ReduxSingletonInstance } from '../app/store/reduxSingletonInstance';

export const useReduxSelector = (selector: (state: any) => any ) => {
    const ReaderFactory = ReduxSingletonInstance;
    const [ selectedValue, setSelectedValue ] = useState(selector(ReaderFactory.get().getState()));

    useEffect(() => {
        const unsubscribe = ReaderFactory.get().subscribe(() => {
            if (selectedValue !== ReaderFactory.get().getState()) {
                setSelectedValue(selector(ReaderFactory.get().getState()));
            }
        });

        return unsubscribe;
    }, []);

    return [selectedValue, ReaderFactory.get().dispatch.bind(ReaderFactory)];
};
