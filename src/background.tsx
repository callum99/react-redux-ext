import { ReduxStore } from './app/store/reduxSingletonInstance';

// This has been added for demonstration purposes while im learning the
// setup, currently not in use.
(async () => {
    await ReduxStore.initFactory(false);

    ReduxStore.get().subscribe(() => {
        console.log('SERVICE WORKER SUBSCRIBED!!', ReduxStore.get().getState());
    });
})();
