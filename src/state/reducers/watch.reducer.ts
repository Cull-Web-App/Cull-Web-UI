import { handleActions } from 'redux-actions';
import { initializeWatchSuccess, initializeWatchError, createOneWatchSuccess, createOneWatchError, deleteOneWatchSuccess, deleteOneWatchError, updateManyWatchSuccess, updateManyWatchError, createManyWatchSuccess, createManyWatchError, deleteManyWatchSuccess, deleteManyWatchError } from '../actions';
import { IWatch } from '../../common';
import { IWatchPartition } from '../partitions';

type WatchState = IWatchPartition;

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
        [createManyWatchSuccess.toString()]: (state: WatchState, { payload: { watches } }: any) => ({
            watches: [...state.watches, ...watches].sort((a: IWatch, b: IWatch) => a.position - b.position),
            error: null
        }),
        [createManyWatchError.toString()]: (state: WatchState, action: any) => ({
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
        [deleteManyWatchSuccess.toString()]: (state: WatchState, { payload: { symbols } }: any) => ({
            watches: state.watches.filter(a => !symbols.includes(a.symbol)).sort((a: IWatch, b: IWatch) => a.position - b.position),
            error: null
        }),
        [deleteManyWatchError.toString()]: (state: WatchState, action: any) => ({
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