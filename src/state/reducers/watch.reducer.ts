import { handleActions } from 'redux-actions';
import { initializeWatchSuccess, initializeWatchError, createOneWatchSuccess, createOneWatchError, deleteOneWatchSuccess, deleteOneWatchError, updateManyWatchSuccess, updateManyWatchError } from '../actions';
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
            watches: watches.sort((a: IWatch, b: IWatch) => a.position - b.position),
            error: null
        }),
        [initializeWatchError.toString()]: (state: WatchState, action: any) => ({
            watches: [],
            error: action.payload
        }),
        [createOneWatchSuccess.toString()]: (state: WatchState, { payload: { watch } }: any) => ({
            watches: [...state.watches, watch].sort((a: IWatch, b: IWatch) => a.position - b.position),
            error: null
        }),
        [createOneWatchError.toString()]: (state: WatchState, action: any) => ({
            watches: state.watches,
            error: action.payload
        }),
        [deleteOneWatchSuccess.toString()]: (state: WatchState, { payload: { symbol } }: any) => ({
            watches: state.watches.filter(a => a.symbol !== symbol).sort((a: IWatch, b: IWatch) => a.position - b.position),
            error: null
        }),
        [deleteOneWatchError.toString()]: (state: WatchState, action: any) => ({
            watches: state.watches,
            error: action.payload
        }),
        [updateManyWatchSuccess.toString()]: (state: WatchState, { payload: { watches } }: any) => {
            const updatedWatchesSet = new Set(watches.map((a: IWatch) => a.symbol));
            const oldWatchesWithoutNewWatches = state.watches.filter(a => !updatedWatchesSet.has(a.symbol));
            return {
                watches: [...oldWatchesWithoutNewWatches, ...watches].sort((a: IWatch, b: IWatch) => a.position - b.position),
                error: null
            };
        },
        [updateManyWatchError.toString()]: (state: WatchState, action: any) => ({
            watches: state.watches,
            error: action.payload
        })
    },
    initialState
);