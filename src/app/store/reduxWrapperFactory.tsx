import { ReduxWrapper } from './reduxWrapper';

export class ReduxWrapperFactory {
    private _store?: ReduxWrapper;
    private _storeInitialising: boolean = false;
    private _storeCreatedCallbacks: Array<() => void> = [];

    public initFactory (isReader: boolean): Promise<ReduxWrapper> {
        return new Promise(async (resolve, reject) => {
            if (this._store) {
                return resolve(this._store);
            };

            if (this._storeInitialising) {
                this._storeCreatedCallbacks.push(() => {
                    return this._store ? resolve(this._store) : reject(this._store);
                });
                return;
            };

            this._storeInitialising = true;
            this._store = await ReduxWrapper.initReduxWrapper(isReader);
            this._storeCreatedCallbacks.forEach((storeCreated) => {
                return storeCreated();
            });

            this._storeCreatedCallbacks = [];
            this._storeInitialising = false;
            return resolve(this._store);
        });
    };

    public get () {
        return this._store;
    };
};
