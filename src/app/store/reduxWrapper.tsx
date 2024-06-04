import {
    combineSlices,
    configureStore,
    EnhancedStore,
} from "@reduxjs/toolkit";
import { DispatchActionType, initialStorageType } from '../global.types';
import { ApplicationSlices } from "./reducers/applicationSlices";

export class ReduxWrapper {
    private _store: EnhancedStore;
    private readonly _reservedSelfUpdateActionType: string = 'reader/selfUpdate';
    private static readonly _storageObjectName: string = 'currentState';

    public constructor(
        initialState: initialStorageType,
        private readonly _isReader: boolean = true
    ) {
        this._store = this.createReduxStoreInstance(initialState);
        this.setupListeners();
    };

    private createReduxStoreInstance(initialState: initialStorageType) {
        const sliceReducer = combineSlices(...Object.values(ApplicationSlices));

        return configureStore({
            reducer: (state, action) => {
                if (action.type == this._reservedSelfUpdateActionType) {
                    state = action.payload;

                    return state;
                };

                return sliceReducer(state, action);
            },
            preloadedState: initialState
        });
    };

    private setupListeners() {
        if (this._isReader) {
            chrome.storage.onChanged.addListener((pageStorage) => {
                this.dispatch({
                    type: this._reservedSelfUpdateActionType,
                    payload: pageStorage[ReduxWrapper._storageObjectName].newValue
                });
            });
        } else {
            chrome.runtime.onMessage.addListener((request) => {
                if (request.messageAction.type !== this._reservedSelfUpdateActionType) {
                    this.dispatch({
                        type: request.messageAction.type,
                        payload: request.messageAction.payload
                    });

                    chrome.storage.local.set({
                        [ReduxWrapper._storageObjectName]: this.getState()
                    });
                }
            });
        };
    };

    public dispatch(dispatchAction: DispatchActionType<any>): DispatchActionType<any> | undefined {
        if (this._isReader && dispatchAction.type !== this._reservedSelfUpdateActionType) {
            chrome.runtime.sendMessage({
                messageAction: dispatchAction
            });
            return;
        };

        return this._store.dispatch({
            type: dispatchAction.type,
            payload:dispatchAction.payload
        });
    };

    public subscribe(subValue: () => void) {
        return this._store.subscribe(subValue);
    };

    public getState() {
        return this._store.getState();
    };

    public static async initReduxWrapper (isReader:boolean): Promise<ReduxWrapper> {
        const getStorage = await chrome.storage.local.get(this._storageObjectName);
        const initialStorageState = getStorage[this._storageObjectName] ? getStorage[this._storageObjectName] : {}

        return new ReduxWrapper(initialStorageState, isReader);
    };
};
