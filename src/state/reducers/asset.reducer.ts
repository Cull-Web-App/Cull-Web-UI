import { handleActions } from 'redux-actions';
import { initializeAssetsSuccess, initializeAssetsError, findManyAssetsWithQuerySuccess, findManyAssetsWithQueryError, clearAssetSearchSuccess, clearAssetSearchError, findOneAssetSuccess, findOneAssetError, findManyAssetsSuccess, findManyAssetsError } from '../actions';
import { IAsset } from '../../common';

interface AssetState {
    assets: Map<string, IAsset>;
    latestQueryResult: IAsset[];
    error: string | null;
}

const initialState: AssetState = {
    assets: new Map<string, IAsset>(),
    latestQueryResult: [],
    error: null
};

// TODO: fix anys
export const asset = handleActions<AssetState, string>(
    {
        [initializeAssetsSuccess.toString()]: (state: AssetState, { payload: { assets } }: any) => ({
            assets: new Map<string, IAsset>([...assets.map((asset: IAsset) => [asset.symbol, asset] as [string, IAsset])]),
            latestQueryResult: [],
            error: null
        }),
        [initializeAssetsError.toString()]: (state: AssetState, action: any) => ({
            assets: new Map<string, IAsset>(),
            latestQueryResult: [],
            error: action.payload
        }),
        [findManyAssetsWithQuerySuccess.toString()]: (state: AssetState, { payload: { assets } }: any) => {
            assets.forEach((asset: IAsset) => {
                if (!state.assets.has(asset.symbol)) {
                    state.assets.set(asset.symbol, asset);
                }
            });

            return {
                assets: state.assets,
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
            state.assets.set(asset.symbol, asset);

            return {
                ...state,
                assets: state.assets,
                error: null
            };
        },
        [findOneAssetError.toString()]: (state: AssetState, action: any) => ({
            ...state,
            error: action.payload
        }),
        [findManyAssetsSuccess.toString()]: (state: AssetState, { payload: { assets } }: any) => {
            assets.forEach((asset: IAsset) => {
                if (!state.assets.has(asset.symbol)) {
                    state.assets.set(asset.symbol, asset);
                }
            });

            return {
                ...state,
                assets: state.assets,
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