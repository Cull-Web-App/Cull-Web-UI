import { handleActions } from 'redux-actions';
import { receiveBar, subscribeBarSuccess,  } from '../actions';

interface BarState {
    subscribedSymbols: string[];
    priceMap: Record<string, number>;
}

const initialState: BarState = {
    subscribedSymbols: [],
    priceMap: {}
};

// TODO: fix anys
export const bar = handleActions<BarState, string>(
    {
        [subscribeBarSuccess.toString()]: (state: BarState, action: any) => {
            return {
                ...state,
                subscribedSymbols: [...state.subscribedSymbols, action.payload]
            }
        },
        [''.toString()]: (state: BarState, action: any) => {
            return {
                ...state,
                subscribedSymbols: state.subscribedSymbols.filter((symbol: string) => symbol !== action.payload)
            };
        },
        [receiveBar.toString()]: (state: BarState, action: any) => {
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