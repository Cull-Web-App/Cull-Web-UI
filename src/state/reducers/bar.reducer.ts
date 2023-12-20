import { handleActions } from 'redux-actions';
import { findManyBarSuccess, receiveBarSuccess, subscribeBarSuccess, unsubscribeBarSuccess,  } from '../actions';
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
            };
        },
        [unsubscribeBarSuccess.toString()]: (state: BarState, action: any) => {
            return {
                ...state,
                subscribedSymbols: state.subscribedSymbols.filter((symbol: string) => symbol !== action.payload.symbol)
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
                };
            } else {
                // Otherwise, append bar to existing array
                return {
                    ...state,
                    barMap: {
                        ...state.barMap,
                        [symbol]: [...state.barMap[symbol], bar]
                    }
                };
            }
        },
        [findManyBarSuccess.toString()]: (state: BarState, action: any) => {
            const { symbol, bars } = action.payload as { symbol: string, bars: IBar[] };

            // Create new array of bars for symbol if it doesn't exist
            if (!state.barMap[symbol]) {
                return {
                    ...state,
                    barMap: {
                        ...state.barMap,
                        [symbol]: bars
                    }
                };
            } else {
                // Need to find where to insert bars
                // The bars are sorted by date ascending
                // and are contiguous
                // So we can find the first bar in the existing array
                // that is after the first bar in the new array
                // and insert the new array there
                
                // There are a few cases: The new array is entirely before the existing array
                // The new array is entirely after the existing array
                // The new array overlaps the existing array
                // The new array is contained within the existing array
                // The new array is equal to the existing array
                if (bars[bars.length - 1].timeUtc < state.barMap[symbol][0].timeUtc) {
                    // New array is entirely before the existing array
                    return {
                        ...state,
                        barMap: {
                            ...state.barMap,
                            [symbol]: [...bars, ...state.barMap[symbol]]
                        }
                    };
                } else if (bars[0].timeUtc > state.barMap[symbol][state.barMap[symbol].length - 1].timeUtc) {
                    // New array is entirely after the existing array
                    return {
                        ...state,
                        barMap: {
                            ...state.barMap,
                            [symbol]: [...state.barMap[symbol], ...bars]
                        }
                    };
                } else if (bars[0].timeUtc < state.barMap[symbol][0].timeUtc && bars[bars.length - 1].timeUtc > state.barMap[symbol][state.barMap[symbol].length - 1].timeUtc) {
                    // New array encompasses the existing array -- overwrite the existing array
                    return {
                        ...state,
                        barMap: {
                            ...state.barMap,
                            [symbol]: bars
                        }
                    };
                } else if (bars[0].timeUtc > state.barMap[symbol][0].timeUtc && bars[bars.length - 1].timeUtc < state.barMap[symbol][state.barMap[symbol].length - 1].timeUtc) {
                    // New array is contained within the existing array -- overwrite only the overlapping bars
                    const firstIndex = state.barMap[symbol].findIndex((bar: IBar) => bar.timeUtc > bars[0].timeUtc);
                    const lastIndex = state.barMap[symbol].findIndex((bar: IBar) => bar.timeUtc > bars[bars.length - 1].timeUtc);
                    const newBars = [...state.barMap[symbol].slice(0, firstIndex), ...bars, ...state.barMap[symbol].slice(lastIndex)];
                    return {
                        ...state,
                        barMap: {
                            ...state.barMap,
                            [symbol]: newBars
                        }
                    };
                } else {
                    // New array overlaps the existing array -- overwrite only the overlapping bars -- TODO THIS IS WRONG
                    const firstIndex = state.barMap[symbol].findIndex((bar: IBar) => bar.timeUtc > bars[0].timeUtc);
                    const lastIndex = state.barMap[symbol].findIndex((bar: IBar) => bar.timeUtc > bars[bars.length - 1].timeUtc);
                    const newBars = [...state.barMap[symbol].slice(0, firstIndex), ...bars, ...state.barMap[symbol].slice(lastIndex)];
                    return {
                        ...state,
                        barMap: {
                            ...state.barMap,
                            [symbol]: newBars
                        }
                    };
                }
            }
        }
    },
    initialState
);