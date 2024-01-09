import { IWatch } from '../../common';
import { createActions } from 'redux-actions';

export const {
    initializeWatch,
    initializeWatchSuccess,
    initializeWatchError,
    createOneWatch,
    createOneWatchSuccess,
    createOneWatchError,
    deleteOneWatch,
    deleteOneWatchSuccess,
    deleteOneWatchError,
    updateManyWatch,
    updateManyWatchSuccess,
    updateManyWatchError
} = createActions({
    INITIALIZE_WATCH: undefined,
    INITIALIZE_WATCH_SUCCESS: ({ watches }: { watches: IWatch[] }) => ({ watches }),
    INITIALIZE_WATCH_ERROR: (error: string) => ({ error }),
    CREATE_ONE_WATCH: ({ symbol, position }: { symbol: string, position: number }) => ({ symbol, position }),
    CREATE_ONE_WATCH_SUCCESS: ({ watch }: { watch: IWatch }) => ({ watch }),
    CREATE_ONE_WATCH_ERROR: (error: string) => ({ error }),
    DELETE_ONE_WATCH: ({ symbol }: { symbol: string }) => ({ symbol }),
    DELETE_ONE_WATCH_SUCCESS: ({ symbol }: { symbol: string }) => ({ symbol }),
    DELETE_ONE_WATCH_ERROR: (error: string) => ({ error }),
    UPDATE_MANY_WATCH: ({ watches }: { watches: IWatch[] }) => ({ watches }),
    UPDATE_MANY_WATCH_SUCCESS: ({ watches }: { watches: IWatch[] }) => ({ watches }),
    UPDATE_MANY_WATCH_ERROR: (error: string) => ({ error })
});