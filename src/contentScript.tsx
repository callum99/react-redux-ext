import { ReduxSingletonInstance } from '../src/app/store/reduxSingletonInstance';

// This has been added for demostration purposes while im learning the
// setup, currently not in use.
(async () => {
    await ReduxSingletonInstance.initFactory(true);

    ReduxSingletonInstance.get()?.subscribe(() => {
        console.log('CONTENT SCRIPT SUBSCRIBED!!', ReduxSingletonInstance.get()?.getState());
    });
})();