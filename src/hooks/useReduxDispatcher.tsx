import React from 'react';
import { ReduxStore } from '../app/store/reduxSingletonInstance'

export const useReduxDispatcher = () => {
    const Redux = ReduxStore.get();

    return Redux.dispatch.bind(Redux);
};
