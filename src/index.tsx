import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { ReduxStore } from "./app/store/reduxSingletonInstance";

// Initializing React store instance before start of app as it is async code.
// Fetch storage and set as initial state of store if exists.
(async () => {
    await ReduxStore.initFactory(true);

    // Using strict mode, ! (bang) to specify never null
    const root = createRoot(document.getElementById('root')!);
    root.render(
        <App />
    );
})();
