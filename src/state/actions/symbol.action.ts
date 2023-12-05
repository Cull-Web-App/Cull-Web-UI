import { createActions } from 'redux-actions';

export const {
    initializeSymbols,
    initializeSymbolsSuccess,
    initializeSymbolsError
} = createActions({
    INITIALIZE_SYMBOLS: undefined,
    INITIALIZE_SYMBOLS_SUCCESS: (symbols: string[]) => symbols,
    INITIALIZE_SYMBOLS_ERROR: (error: string) => error
 });