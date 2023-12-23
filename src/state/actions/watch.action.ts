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
    deleteOneWatchError
} = createActions({
    INITIALIZE_WATCH: undefined,
    INITIALIZE_WATCH_SUCCESS: ({ assets }: { assets: string[] }) => ({ assets }),
    INITIALIZE_WATCH_ERROR: (error: string) => ({ error }),
    CREATE_ONE_WATCH: ({ asset }: { asset: string }) => ({ asset }),
    CREATE_ONE_WATCH_SUCCESS: ({ asset }: { asset: string }) => ({ asset }),
    CREATE_ONE_WATCH_ERROR: (error: string) => ({ error }),
    DELETE_ONE_WATCH: ({ asset }: { asset: string }) => ({ asset }),
    DELETE_ONE_WATCH_SUCCESS: ({ asset }: { asset: string }) => ({ asset }),
    DELETE_ONE_WATCH_ERROR: (error: string) => ({ error })
});