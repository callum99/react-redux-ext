import React from 'react';
import { ReduxStore } from '../app/store/reduxSingletonInstance'

export const useReduxDispatcher = () => {
    return ReduxStore.get().dispatch.bind(ReduxStore);
};
