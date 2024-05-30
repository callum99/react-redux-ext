import { createRoot } from "react-dom/client";
import React from "react";
import App from "./app";
import { ReduxSingletonInstance } from "./app/store/reduxSingletonInstance";

// Initilising React store instance before start of app as it is async code.
// Fetch storage and set as initial state if exists.
(async () => {
    await ReduxSingletonInstance.initFactory(true);

    ReduxSingletonInstance.get()?.subscribe(() => {
        console.log('REACT SUBSCRIBED!!', ReduxSingletonInstance.get()?.getState());
    });
})();

// Using strict mode, ! (bang) to specify never null
const root = createRoot(document.getElementById('root')!);
root.render(
    <App />
);
