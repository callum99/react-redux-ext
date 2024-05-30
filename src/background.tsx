import { ReduxSingletonInstance } from './app/store/reduxSingletonInstance';

// This has been added for demostration purposes while im learning the
// setup, currently not in use.
(async () => {
    await ReduxSingletonInstance.initFactory(false);

    ReduxSingletonInstance.get()?.subscribe(() => {
        console.log('SERVICE WORKER SUBSCRIBED!!', ReduxSingletonInstance.get()?.getState());
    });
})();
