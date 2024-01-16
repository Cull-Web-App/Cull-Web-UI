import { handleActions } from 'redux-actions';
import { initializeAssetsSuccess, initializeAssetsError, findManyAssetsWithQuerySuccess, findManyAssetsWithQueryError, clearAssetSearchSuccess, clearAssetSearchError, findOneAssetSuccess, findOneAssetError, findManyAssetsSuccess, findManyAssetsError } from '../actions';
import { IAsset } from '../../common';
import { IAssetPartition } from '../partitions';

type AssetState = IAssetPartition;

const initialState: AssetState = {
    assets: {},
    latestQueryResult: [],
    error: null
};

// TODO: fix anys
export const asset = handleActions<AssetState, string>(
    {
        [initializeAssetsSuccess.toString()]: (state: AssetState, { payload: { assets } }: any) => ({
            assets: {
                ...state.assets,
                ...assets.reduce((acc: Record<string, IAsset>, asset: IAsset) => ({
                    ...acc,
                    [asset.symbol]: asset
                }), {})
            },
            latestQueryResult: [],
            error: null
        }),
        [initializeAssetsError.toString()]: (state: AssetState, action: any) => ({
            assets: {},
            latestQueryResult: [],
            error: action.payload
        }),
        [findManyAssetsWithQuerySuccess.toString()]: (state: AssetState, { payload: { assets } }: any) => {
            let newAssets = { ...state.assets };
            assets.forEach((asset: IAsset) => {
                if (!newAssets[asset.symbol]) {
                    newAssets[asset.symbol] = asset;
                }
            });

            return {
                assets: newAssets,
                latestQueryResult: assets,
                error: null
            };
        },
        [findManyAssetsWithQueryError.toString()]: (state: AssetState, action: any) => ({
            ...state,
            latestQueryResult: [],
            error: action.payload
        }),
        [findOneAssetSuccess.toString()]: (state: AssetState, { payload: { asset } }: any) => {
            return {
                ...state,
                assets: {
                    ...state.assets,
                    [asset.symbol]: asset
                },
                error: null
            };
        },
        [findOneAssetError.toString()]: (state: AssetState, action: any) => ({
            ...state,
            error: action.payload
        }),
        [findManyAssetsSuccess.toString()]: (state: AssetState, { payload: { assets } }: any) => {
            let newAssets = { ...state.assets };
            assets.forEach((asset: IAsset) => {
                if (!newAssets[asset.symbol]) {
                    newAssets[asset.symbol] = asset;
                }
            });

            return {
                ...state,
                assets: newAssets,
                error: null
            };
        },
        [findManyAssetsError.toString()]: (state: AssetState, action: any) => ({
            ...state,
            error: action.payload
        }),
        [clearAssetSearchSuccess.toString()]: (state: AssetState) => ({
            ...state,
            latestQueryResult: []
        }),
        [clearAssetSearchError.toString()]: (state: AssetState, action: any) => ({
            ...state,
            latestQueryResult: [],
            error: action.payload
        })
    },
    initialState
);