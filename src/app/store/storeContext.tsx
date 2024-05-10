import { createContext, useContext } from "react";
import ReduxWrapper from "./reduxWrapper";

export const StoreContext = createContext(new ReduxWrapper({}, true));

export const getReduxStoreProperties = () => {
    const store = useContext(StoreContext);

    const getStateReact = () => {
        return store.getState();
    };

    const dispatchReact = (actionType: { type: string; }) => {
        chrome.runtime.sendMessage({
            messageAction: {type:actionType.type, payload: getStateReact}
        });
    };

    const subscribeReact = () => {
        store.subscribe(() => {});
    };

    return {getStateReact, dispatchReact, subscribeReact};
}