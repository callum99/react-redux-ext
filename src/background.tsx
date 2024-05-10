import ReduxWrapper from "./app/store/reduxWrapper";
import rootReducers from "./app/store/reducers/rootSlice";

const serviceWorkerStore = new ReduxWrapper(rootReducers, false);

// Subscribing is not needed, as I'm not utilising the data at this point.
// but for my own learning benefit I have included it.
serviceWorkerStore.subscribe(() => {
    console.log('service worker counter', serviceWorkerStore.getState().counter.value);
});