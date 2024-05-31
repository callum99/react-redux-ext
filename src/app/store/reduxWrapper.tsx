import {
    combineSlices,
    configureStore,
    EnhancedStore,
} from "@reduxjs/toolkit";
import { DispatchActionType } from '../global.types';
import { ApplicationSlices } from "./reducers/applicationSlices";

export class ReduxWrapper {
    private _store: EnhancedStore;
    private readonly _reservedSelfUpdateActionType: string = 'reader/selfUpdate';
    private static readonly _storageObjectName: string = 'currentState';

    public constructor(
        private _initialState: {[key:string]: { [key:string]: Partial<DispatchActionType<any>>}},
        private readonly _isReader: boolean = true
    ) {
        this._store = this.createReduxStoreInstance();
        this.setupListeners();
    };

    private createReduxStoreInstance() {
        const sliceReducer = combineSlices(...Object.values(ApplicationSlices));

        return configureStore({
            reducer: (state, action) => {
                if (action.type == this._reservedSelfUpdateActionType) {
                    state = action.payload;

                    return state;
                };

                return sliceReducer(state, action);
            },
            preloadedState: this._initialState
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
                    const actionType = request.messageAction.type;
                    const actionPayload = request.messageAction.payload;

                    this.dispatch({type: actionType, payload: actionPayload});

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

        return this._store.dispatch({type: dispatchAction.type, payload:dispatchAction.payload});
    };

    public subscribe(subValue: () => void) {
        return this._store.subscribe(subValue);
    };

    public getState() {
        return this._store.getState();
    };

    public static async initReduxWrapper (isReader:boolean): Promise<ReduxWrapper> {
        const getStorage = await chrome.storage.local.get([this._storageObjectName]);
        const initialStorageState = getStorage[this._storageObjectName] ? getStorage[this._storageObjectName] : {}

        return new ReduxWrapper(initialStorageState, isReader);
    };
};
