import { handleActions } from 'redux-actions';
import { subscribeSuccess, unsubscribeSuccess, updatePrice } from '../actions';

interface PriceState {
    subscribedSymbols: string[];
    priceMap: Record<string, number>;
}

const initialState: PriceState = {
    subscribedSymbols: [],
    priceMap: {}
};

// TODO: fix anys
export const price = handleActions<PriceState, string>(
    {
        [subscribeSuccess.toString()]: (state: PriceState, action: any) => {
            return {
                ...state,
                subscribedSymbols: [...state.subscribedSymbols, action.payload]
            }
        },
        [unsubscribeSuccess.toString()]: (state: PriceState, action: any) => {
            return {
                ...state,
                subscribedSymbols: state.subscribedSymbols.filter((symbol: string) => symbol !== action.payload)
            };
        },
        [updatePrice.toString()]: (state: PriceState, action: any) => {
            return {
                ...state,
                priceMap: {
                    ...state.priceMap,
                    [action.payload.symbol]: action.payload.price
                }
            }
        }
    },
    initialState
);