import { ReduxStore } from './app/store/reduxSingletonInstance';

// This has been added for demonstration purposes while im learning the
// setup, currently not in use.
(async () => {
    await ReduxStore.initFactory(true);

    ReduxStore.get().subscribe(() => {
        console.log('CONTENT SCRIPT SUBSCRIBED!!', ReduxStore.get().getState());
    });
})();
