import { IAsset } from '../../common';
import { createActions } from 'redux-actions';

export const {
    initializeSymbols,
    initializeSymbolsSuccess,
    initializeSymbolsError,
    findManyAssetsWithQuery,
    findManyAssetsWithQuerySuccess,
    findManyAssetsWithQueryError,
    clearSearch,
    clearSearchSuccess,
    clearSearchError
} = createActions({
    INITIALIZE_SYMBOLS: undefined,
    INITIALIZE_SYMBOLS_SUCCESS: (symbols: IAsset[]) => symbols,
    INITIALIZE_SYMBOLS_ERROR: (error: string) => error,
    FIND_MANY_ASSETS_WITH_QUERY: ({ query }: { query: string }) => ({ query }),
    FIND_MANY_ASSETS_WITH_QUERY_SUCCESS: ({ assets }: { assets: IAsset[] }) => ({ assets }),
    FIND_MANY_ASSETS_WITH_QUERY_ERROR: (error: string) => error,
    CLEAR_SEARCH: undefined,
    CLEAR_SEARCH_SUCCESS: undefined,
    CLEAR_SEARCH_ERROR: (error: string) => error
 });