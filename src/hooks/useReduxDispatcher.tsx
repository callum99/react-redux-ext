import React from "react";
import { ReduxSingletonInstance } from '../app/store/reduxSingletonInstance'

export const useReduxDispatcher = () => {
    const dispatch = ReduxSingletonInstance.get().dispatch.bind(ReduxSingletonInstance);

    if (!dispatch) throw new Error("No dispatch method.");
    return dispatch;
};
