import {
    combineSlices,
    configureStore,
    EnhancedStore,
} from "@reduxjs/toolkit";
import { DispatchActionType, StoreSliceType } from '../global.types';
import { ApplicationSlices } from "./reducers/applicationSlices";

export const STORAGE_OBJECT_NAME: string = 'currentState';

export class ReduxWrapper {
    private _store: EnhancedStore;
    private readonly _reservedSelfUpdateActionType: string = 'reader/selfUpdate';

    public constructor(
        private _slices: StoreSliceType,
        private readonly _isReader: boolean = true,
        private _initialState: {[key:string]: { [key:string]: Partial<DispatchActionType<any>>}}
    ) {
        this._store = this.createReduxStoreInstance();
        this.setupListeners();
    };

    private createReduxStoreInstance() {
        const sliceReducer = combineSlices(...Object.values(this._slices));

        return configureStore({
            reducer: (state, action) => {
                if (action.type == this._reservedSelfUpdateActionType) {
                    state = action.payload;
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
                    payload: pageStorage[STORAGE_OBJECT_NAME].newValue.payload
                });
            });
        } else {
            chrome.runtime.onMessage.addListener((request) => {
                if (request.messageAction.type !== this._reservedSelfUpdateActionType) {
                    const actionType = request.messageAction.type;
                    const actionPayload = request.messageAction.payload;

                    this.dispatch({type: actionType, payload: actionPayload});

                    chrome.storage.local.set({
                        [STORAGE_OBJECT_NAME]: {
                            type: actionType,
                            payload: this.getState(),
                        }
                    });
                }
            });
        };
    };

    public dispatch(dispatchAction: DispatchActionType<any>): DispatchActionType<any> | undefined {
        const generateAction = !dispatchAction.payload ? {
            type: dispatchAction.type,
        } : {
            type: dispatchAction.type,
            payload: dispatchAction.payload,
        };

        if (this._isReader && dispatchAction.type !== this._reservedSelfUpdateActionType) {
            chrome.runtime.sendMessage({
                messageAction: generateAction
            });
            return;
        };

        return this._store.dispatch(generateAction);
    };

    public subscribe(subValue: () => void) {
        return this._store.subscribe(subValue);
    };

    public getState() {
        return this._store.getState();
    };

    public static async initReduxWrapper (isReader:boolean): Promise<ReduxWrapper> {
        let initialStorageState = await chrome.storage.local
            .get(STORAGE_OBJECT_NAME)
            .then((result) => {
                return result[STORAGE_OBJECT_NAME] ? result[STORAGE_OBJECT_NAME].payload : {};
            })
            .catch((e) => {
                throw new Error(e);
            });

        return new ReduxWrapper(ApplicationSlices, isReader, initialStorageState);
    };
};
