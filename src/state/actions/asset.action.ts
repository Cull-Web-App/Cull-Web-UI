import { IAsset } from '../../common';
import { createActions } from 'redux-actions';

export const {
    initializeAssets,
    initializeAssetsSuccess,
    initializeAssetsError,
    findManyAssetsWithQuery,
    findManyAssetsWithQuerySuccess,
    findManyAssetsWithQueryError,
    clearSearch,
    clearSearchSuccess,
    clearSearchError
} = createActions({
    INITIALIZE_ASSETS: undefined,
    INITIALIZE_ASSETS_SUCCESS: (assets: IAsset[]) => assets,
    INITIALIZE_ASSETS_ERROR: (error: string) => error,
    FIND_MANY_ASSETS_WITH_QUERY: ({ query }: { query: string }) => ({ query }),
    FIND_MANY_ASSETS_WITH_QUERY_SUCCESS: ({ assets }: { assets: IAsset[] }) => ({ assets }),
    FIND_MANY_ASSETS_WITH_QUERY_ERROR: (error: string) => error,
    CLEAR_SEARCH: undefined,
    CLEAR_SEARCH_SUCCESS: undefined,
    CLEAR_SEARCH_ERROR: (error: string) => error
 });