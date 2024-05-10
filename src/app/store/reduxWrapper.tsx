import {
    combineSlices,
    configureStore,
    EnhancedStore,
    Slice,
} from "@reduxjs/toolkit";

class ReduxWrapper {
    private _store: EnhancedStore;
    private readonly _isReader: boolean = true;

    public constructor(public slices: { [key: string]: Slice }, _isReader:boolean) {
        this._store = this.reduxInstance();
        this._isReader = _isReader;
        this.init();
    };

     public reduxInstance() {
        const sliceReducer = combineSlices(...Object.values(this.slices));

        return configureStore({
            reducer: (state, action) => {
                if (action.type == 'reader/selfUpdate') {
                    state = action.payload;
                }

                return sliceReducer(state, action);
            }
        });
    };

    public init() {
        if (this._isReader) {
            chrome.storage.onChanged.addListener((pageStorage) => {
                this.dispatch({
                    type: 'reader/selfUpdate',
                    payload: pageStorage.currentState.newValue.payload
                });
            });
        } else {
            chrome.runtime.onMessage.addListener((request) => {
                const actionType = request.messageAction.type;
                const actionPayload = request.messageAction.payload;

                this.dispatch({type: actionType, payload: actionPayload});

                chrome.storage.local.set({
                    currentState: {
                        type: actionType,
                        payload: this.getState(),
                    }
                });
            });
        }
    };

    public dispatch(dispatchValue: {
        type: string,
        payload: {[key: string] : {value: number }}
    }) {
        if (this._isReader && dispatchValue.type !== 'reader/selfUpdate') {
            chrome.runtime.sendMessage({
                messageAction: {
                    type: dispatchValue.type,
                    payload: dispatchValue.payload,
                }
            });
            return;
        }

        this._store.dispatch({
            type: dispatchValue.type,
            payload: dispatchValue.payload
        });
    };

    public subscribe(subValue: () => void) {
        return this._store.subscribe(subValue);
    }

    public getState() {
        return this._store.getState();
    };
}

export default ReduxWrapper;
