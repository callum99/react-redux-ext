import { createRoot } from "react-dom/client";
import * as React from "react";
import App from "./app";

// using strict mode, ! (bang) to specify never null
const root = createRoot(document.getElementById('root')!);
root.render(
    <App />
);
