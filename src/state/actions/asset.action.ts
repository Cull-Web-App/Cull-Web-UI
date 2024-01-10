import { IAsset } from '../../common';
import { createActions } from 'redux-actions';

export const {
    initializeAssets,
    initializeAssetsSuccess,
    initializeAssetsError,
    findManyAssetsWithQuery,
    findManyAssetsWithQuerySuccess,
    findManyAssetsWithQueryError,
    findOneAsset,
    findOneAssetSuccess,
    findOneAssetError,
    findManyAssets,
    findManyAssetsSuccess,
    findManyAssetsError,
    clearAssetSearch,
    clearAssetSearchSuccess,
    clearAssetSearchError
} = createActions({
    INITIALIZE_ASSETS: undefined,
    INITIALIZE_ASSETS_SUCCESS: (assets: IAsset[]) => assets,
    INITIALIZE_ASSETS_ERROR: (error: string) => error,
    FIND_MANY_ASSETS_WITH_QUERY: ({ query }: { query: string }) => ({ query }),
    FIND_MANY_ASSETS_WITH_QUERY_SUCCESS: ({ assets }: { assets: IAsset[] }) => ({ assets }),
    FIND_MANY_ASSETS_WITH_QUERY_ERROR: (error: string) => error,
    FIND_ONE_ASSET: ({ symbol }: { symbol: string }) => ({ symbol }),
    FIND_ONE_ASSET_SUCCESS: ({ asset }: { asset: IAsset }) => ({ asset }),
    FIND_ONE_ASSET_ERROR: (error: string) => error,
    FIND_MANY_ASSETS: ({ symbols }: { symbols: string[] }) => ({ symbols }),
    FIND_MANY_ASSETS_SUCCESS: ({ assets }: { assets: IAsset[] }) => ({ assets }),
    FIND_MANY_ASSETS_ERROR: (error: string) => error,
    CLEAR_ASSET_SEARCH: undefined,
    CLEAR_ASSET_SEARCH_SUCCESS: undefined,
    CLEAR_ASSET_SEARCH_ERROR: (error: string) => error
 });