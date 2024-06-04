import React from 'react';
import { ReduxSingletonInstance } from '../app/store/reduxSingletonInstance'

export const useReduxDispatcher = () => {
    return ReduxSingletonInstance.get().dispatch.bind(ReduxSingletonInstance);
};
