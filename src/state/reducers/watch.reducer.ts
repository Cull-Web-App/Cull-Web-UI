import { handleActions } from 'redux-actions';
import { initializeWatchSuccess, initializeWatchError, createOneWatchSuccess, createOneWatchError, deleteOneWatchSuccess, deleteOneWatchError } from '../actions';

interface WatchState {
    assets: string[];
    error: string | null;
}

const initialState: WatchState = {
    assets: [],
    error: null
};

// TODO: fix anys
export const watch = handleActions<WatchState, string>(
    {
        [initializeWatchSuccess.toString()]: (state: WatchState, { payload: { assets } }: any) => ({
            assets: assets,
            error: null
        }),
        [initializeWatchError.toString()]: (state: WatchState, action: any) => ({
            assets: [],
            error: action.payload
        }),
        [createOneWatchSuccess.toString()]: (state: WatchState, { payload: { asset } }: any) => ({
            assets: [...state.assets, asset],
            error: null
        }),
        [createOneWatchError.toString()]: (state: WatchState, action: any) => ({
            assets: state.assets,
            error: action.payload
        }),
        [deleteOneWatchSuccess.toString()]: (state: WatchState, { payload: { asset } }: any) => ({
            assets: state.assets.filter(a => a !== asset),
            error: null
        }),
        [deleteOneWatchError.toString()]: (state: WatchState, action: any) => ({
            assets: state.assets,
            error: action.payload
        })
    },
    initialState
);