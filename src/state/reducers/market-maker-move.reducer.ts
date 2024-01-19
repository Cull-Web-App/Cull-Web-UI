import { handleActions } from 'redux-actions';
import {
    mmmConnectSuccess,
    mmmConnectError,
    mmmDisconnectSuccess,
    mmmDisconnectError,
    mmmSubscribeSuccess,
    mmmSubscribeError,
    mmmUnsubscribeSuccess,
    mmmUnsubscribeError,
    mmmReceiveSuccess,
    mmmUpdateConnectionStatusSuccess,
    mmmUpdateConnectionStatusError,
    mmmUpdateSubscriptionStatusSuccess,
    mmmUpdateSubscriptionStatusError
} from '../actions';
import { IMarketMakerMovePartition } from '../partitions';
import { ConnectionStatus, SubscriptionStatus } from '../../common';

type MarketMakerMoveState = IMarketMakerMovePartition;

const initialState: MarketMakerMoveState = {
    marketMakerMoves: {},
    connectionStatus: ConnectionStatus.Disconnected,
    subscriptionStatusPerSymbol: {},
    error: null
};

// TODO: fix anys
export const marketMakerMove = handleActions<MarketMakerMoveState, string>(
    {
        [mmmConnectSuccess.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            connectionStatus: ConnectionStatus.Connected
        }),
        [mmmConnectError.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            connectionStatus: ConnectionStatus.Disconnected,
            error: action.payload
        }),
        [mmmDisconnectSuccess.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            connectionStatus: ConnectionStatus.Disconnected
        }),
        [mmmDisconnectError.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            connectionStatus: ConnectionStatus.Connected,
            error: action.payload
        }),
        [mmmSubscribeSuccess.toString()]: (state: MarketMakerMoveState, action: any) => {
            return {
                ...state,
                subscriptionStatusPerSymbol: {
                    ...state.subscriptionStatusPerSymbol,
                    [action.payload.symbol]: SubscriptionStatus.Subscribed
                }
            };
        },
        [mmmSubscribeError.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            error: action.payload
        }),
        [mmmUnsubscribeSuccess.toString()]: (state: MarketMakerMoveState, action: any) => {
            return {
                ...state,
                subscriptionStatusPerSymbol: {
                    ...state.subscriptionStatusPerSymbol,
                    [action.payload.symbol]: SubscriptionStatus.Unsubscribed
                }
            };
        },
        [mmmUnsubscribeError.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            error: action.payload
        }),
        [mmmReceiveSuccess.toString()]: (state: MarketMakerMoveState, action: any) => {
            const { symbol, mmm } = action.payload;

            // Create new array of mmms for symbol if it doesn't exist
            if (!state.marketMakerMoves[symbol]) {
                return {
                    ...state,
                    marketMakerMoves: {
                        ...state.marketMakerMoves,
                        [symbol]: [mmm]
                    }
                };
            } else {
                // Otherwise, append mmm to existing array
                return {
                    ...state,
                    marketMakerMoves: {
                        ...state.marketMakerMoves,
                        [symbol]: [...state.marketMakerMoves[symbol], mmm]
                    }
                };
            }
        },
        [mmmUpdateConnectionStatusSuccess.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            connectionStatus: action.payload.status
        }),
        [mmmUpdateConnectionStatusError.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            error: action.psayload
        }),
        [mmmUpdateSubscriptionStatusSuccess.toString()]: (state: MarketMakerMoveState, action: any) => {
            const { symbol, status } = action.payload;
            return {
                ...state,
                subscriptionStatusPerSymbol: {
                    ...state.subscriptionStatusPerSymbol,
                    [symbol]: status
                }
            };
        },
        [mmmUpdateSubscriptionStatusError.toString()]: (state: MarketMakerMoveState, action: any) => ({
            ...state,
            error: action.payload
        })
    },
    initialState
);