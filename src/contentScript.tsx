import { ReduxSingletonInstance } from './app/store/reduxSingletonInstance';

// This has been added for demonstration purposes while im learning the
// setup, currently not in use.
(async () => {
    await ReduxSingletonInstance.initFactory(true);

    ReduxSingletonInstance.get().subscribe(() => {
        console.log('CONTENT SCRIPT SUBSCRIBED!!', ReduxSingletonInstance.get().getState());
    });
})();
