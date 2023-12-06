import { handleActions } from 'redux-actions';
import { receiveBarSuccess, subscribeBarSuccess, unsubscribeBarSuccess,  } from '../actions';
import { IBar } from '../../common';

interface BarState {
    subscribedSymbols: string[];
    barMap: Record<string, IBar[]>;
}

const initialState: BarState = {
    subscribedSymbols: [],
    barMap: {}
};

// TODO: fix anys
export const bar = handleActions<BarState, string>(
    {
        [subscribeBarSuccess.toString()]: (state: BarState, action: any) => {
            return {
                ...state,
                subscribedSymbols: [...state.subscribedSymbols, action.payload.symbol]
            }
        },
        [unsubscribeBarSuccess.toString()]: (state: BarState, action: any) => {
            return {
                ...state,
                subscribedSymbols: state.subscribedSymbols.filter((symbol: string) => symbol !== action.payload)
            };
        },
        [receiveBarSuccess.toString()]: (state: BarState, action: any) => {
            const { symbol, bar } = action.payload;

            // Create new array of bars for symbol if it doesn't exist
            if (!state.barMap[symbol]) {
                return {
                    ...state,
                    barMap: {
                        ...state.barMap,
                        [symbol]: [bar]
                    }
                }
            } else {
                // Otherwise, append bar to existing array
                return {
                    ...state,
                    barMap: {
                        ...state.barMap,
                        [symbol]: [...state.barMap[symbol], bar]
                    }
                }
            
            }
        }
    },
    initialState
);