import { createRoot } from "react-dom/client";
import React from "react";
import App from "./app";
import { ReduxSingletonInstance } from "./app/store/reduxSingletonInstance";

// Initializing React store instance before start of app as it is async code.
// Fetch storage and set as initial state of store if exists.
(async () => {
    await ReduxSingletonInstance.initFactory(true);

    // Using strict mode, ! (bang) to specify never null
    const root = createRoot(document.getElementById('root')!);
    root.render(
        <App />
    );
})();
