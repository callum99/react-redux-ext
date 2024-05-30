import React, { useEffect, useState } from "react";
import { ReduxSingletonInstance } from '../app/store/reduxSingletonInstance'

export const useReduxDispatcher = () => {
    const ReaderFactory = ReduxSingletonInstance;
    const [ dispatchReady, setDispatchReady ] = useState(false);

    useEffect(() => {
        const unsubscribe = ReaderFactory.get()?.subscribe(() => {
            if (ReaderFactory.get()?.dispatch) {
                setDispatchReady(true);
            }
        });

        return unsubscribe;
    }, [dispatchReady]);

    return ReaderFactory.get()?.dispatch.bind(ReaderFactory);
};
