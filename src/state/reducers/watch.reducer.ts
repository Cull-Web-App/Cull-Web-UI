import { handleActions } from 'redux-actions';
import { initializeWatchSuccess, initializeWatchError, createOneWatchSuccess, createOneWatchError, deleteOneWatchSuccess, deleteOneWatchError } from '../actions';
import { IWatch } from '../../common';

interface WatchState {
    watches: IWatch[];
    error: string | null;
}

const initialState: WatchState = {
    watches: [],
    error: null
};

// TODO: fix anys
export const watch = handleActions<WatchState, string>(
    {
        [initializeWatchSuccess.toString()]: (state: WatchState, { payload: { watches } }: any) => ({
            watches: watches,
            error: null
        }),
        [initializeWatchError.toString()]: (state: WatchState, action: any) => ({
            watches: [],
            error: action.payload
        }),
        [createOneWatchSuccess.toString()]: (state: WatchState, { payload: { watch } }: any) => ({
            watches: [...state.watches, watch],
            error: null
        }),
        [createOneWatchError.toString()]: (state: WatchState, action: any) => ({
            watches: state.watches,
            error: action.payload
        }),
        [deleteOneWatchSuccess.toString()]: (state: WatchState, { payload: { asset } }: any) => ({
            watches: state.watches.filter(a => a !== asset),
            error: null
        }),
        [deleteOneWatchError.toString()]: (state: WatchState, action: any) => ({
            watches: state.watches,
            error: action.payload
        })
    },
    initialState
);