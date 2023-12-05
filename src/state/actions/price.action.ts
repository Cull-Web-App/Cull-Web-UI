import { createActions } from 'redux-actions';

export const {
    subscribe,
    subscribeSuccess,
    subscribeError,
    unsubscribe,
    unsubscribeSuccess,
    unsubscribeError,
    updatePrice,
} = createActions({
    SUBSCRIBE: (symbol: string) => symbol,
    SUBSCRIBE_SUCCESS: ({ symbol }) => symbol,
    SUBSCRIBE_ERROR: (error: string) => error,
    UNSUBSCRIBE: (symbol: string) => symbol,
    UNSUBSCRIBE_SUCCESS: ({ symbol }) => symbol,
    UNSUBSCRIBE_ERROR: (error: string) => error,
    UPDATE_PRICE: ({ symbol, price } ) => ({ symbol, price })
 });