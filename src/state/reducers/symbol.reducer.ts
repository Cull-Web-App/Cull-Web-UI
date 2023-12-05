import { handleActions } from 'redux-actions';
import { initializeSymbolsSuccess, initializeSymbolsError } from '../actions';

interface SymbolState {
    symbols: string[];
    error: string | null;
}

const initialState: SymbolState = {
    symbols: [],
    error: null
};

// TODO: fix anys
export const symbols = handleActions<SymbolState, string>(
    {
        [initializeSymbolsSuccess.toString()]: (state: SymbolState, { payload: { symbols } }: any) => ({
            symbols: symbols,
            error: null
        }),
        [initializeSymbolsError.toString()]: (state: SymbolState, action: any) => ({
            symbols: [],
            error: action.payload
        })
    },
    initialState
);