import { ReduxWrapper } from './reduxWrapper';

export class ReduxWrapperFactory {
    private _storeTest?: ReduxWrapper;
    private _storeInitialising: boolean = false;
    private _storeCreatedCallbacks: Array<(store?: ReduxWrapper) => void> = [];

    public initFactory (isReader: boolean): Promise<ReduxWrapper | undefined> {
        return new Promise((resolve, reject) => {
            if (this._storeTest) {
                return resolve(this._storeTest);
            }

            if (this._storeInitialising) {
                this._storeCreatedCallbacks.push((store) => {
                    return resolve(store);
                });
                return;
            }

            this._storeInitialising = true;

            ReduxWrapper.initReduxWrapper(isReader)
                .then((storeInstance) => {
                    this._storeTest = storeInstance;
                    this._storeCreatedCallbacks.forEach(storeCreated => {
                        return storeCreated(this._storeTest);
                    });

                    this._storeCreatedCallbacks = [];
                    this._storeInitialising = false;

                    return resolve(this._storeTest);
                })
                .catch(reject);
        });
    };

    public get () {
        if (!this._storeTest) throw new Error("no store");
        return this._storeTest;
    };
}
