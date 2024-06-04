import { ReduxWrapper } from './reduxWrapper';

export class ReduxWrapperFactory {
    private _store?: ReduxWrapper;
    private _storeInitialising: boolean = false;
    private _storeCreatedCallbacks: Array<(store?: ReduxWrapper) => void> = [];

    public initFactory (isReader: boolean): Promise<ReduxWrapper | undefined> {
        return new Promise((resolve, reject) => {
            if (this._store) {
                return resolve(this._store);
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
                    this._store = storeInstance;
                    this._storeCreatedCallbacks.forEach(storeCreated => {
                        return storeCreated(this._store);
                    });

                    this._storeCreatedCallbacks = [];
                    this._storeInitialising = false;

                    return resolve(this._store);
                })
                .catch(reject);
        });
    };

    public get () {
        if (!this._store) throw new Error("no store");
        return this._store;
    };
}
