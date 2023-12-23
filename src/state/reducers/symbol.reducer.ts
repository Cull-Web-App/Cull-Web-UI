import { handleActions } from 'redux-actions';
import { initializeSymbolsSuccess, initializeSymbolsError, findManyAssetsWithQuerySuccess, findManyAssetsWithQueryError } from '../actions';
import { IAsset } from '../../common';

interface SymbolState {
    symbols: IAsset[];
    latestQueryResult: IAsset[];
    error: string | null;
}

const initialState: SymbolState = {
    symbols: [],
    latestQueryResult: [],
    error: null
};

// TODO: fix anys
export const symbols = handleActions<SymbolState, string>(
    {
        [initializeSymbolsSuccess.toString()]: (state: SymbolState, { payload: { symbols } }: any) => ({
            symbols: symbols,
            latestQueryResult: [],
            error: null
        }),
        [initializeSymbolsError.toString()]: (state: SymbolState, action: any) => ({
            symbols: [],
            latestQueryResult: [],
            error: action.payload
        }),
        [findManyAssetsWithQuerySuccess.toString()]: (state: SymbolState, { payload: { assets } }: any) => {
            const newAssets = new Map<string, IAsset>([...state.symbols.map((asset: IAsset) => [asset.symbol, asset] as [string, IAsset])]);
            assets.forEach((asset: IAsset) => {
                if (!newAssets.has(asset.symbol)) {
                    newAssets.set(asset.symbol, asset);
                }
            });

            return {
                symbols: [...newAssets.values()],
                latestQueryResult: assets,
                error: null
            };
        },
        [findManyAssetsWithQueryError.toString()]: (state: SymbolState, action: any) => ({
            ...state,
            latestQueryResult: [],
            error: action.payload
        })
    },
    initialState
);