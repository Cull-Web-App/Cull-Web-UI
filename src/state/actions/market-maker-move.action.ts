import { ConnectionStatus, IMarketMakerMove, SubscriptionStatus } from '../../common';
import { createActions } from 'redux-actions';

export const {
    mmmConnect,
    mmmConnectSuccess,
    mmmConnectError,
    mmmDisconnect,
    mmmDisconnectSuccess,
    mmmDisconnectError,
    mmmReceive,
    mmmReceiveSuccess,
    mmmSubscribe,
    mmmSubscribeSuccess,
    mmmSubscribeError,
    mmmUnsubscribe,
    mmmUnsubscribeSuccess,
    mmmUnsubscribeError,
    mmmUpdateConnectionStatus,
    mmmUpdateConnectionStatusSuccess,
    mmmUpdateConnectionStatusError,
    mmmUpdateSubscriptionStatus,
    mmmUpdateSubscriptionStatusSuccess,
    mmmUpdateSubscriptionStatusError
} = createActions({
    MMM_CONNECT: undefined,
    MMM_CONNECT_SUCCESS: undefined,
    MMM_CONNECT_ERROR: (error: string) => error,
    MMM_DISCONNECT: undefined,
    MMM_DISCONNECT_SUCCESS: undefined,
    MMM_DISCONNECT_ERROR: (error: string) => error,
    MMM_RECEIVE: ({ mmm }: { mmm: IMarketMakerMove }) => ({ mmm }),
    MMM_RECEIVE_SUCCESS: ({ symbol, mmm }: { symbol: string, mmm: IMarketMakerMove }) => ({ symbol, mmm }),
    MMM_SUBSCRIBE: ({ symbol }: { symbol: string }) => ({ symbol }),
    MMM_SUBSCRIBE_SUCCESS: ({ symbol }) => ({ symbol }),
    MMM_SUBSCRIBE_ERROR: (error: string) => error,
    MMM_UNSUBSCRIBE: ({ symbol }: { symbol: string }) => ({ symbol }),
    MMM_UNSUBSCRIBE_SUCCESS: ({ symbol }: { symbol: string }) => ({ symbol }),
    MMM_UNSUBSCRIBE_ERROR: (error: string) => error,
    MMM_UPDATE_CONNECTION_STATUS: ({ status }: { status: ConnectionStatus }) => ({ status }),
    MMM_UPDATE_CONNECTION_STATUS_SUCCESS: ({ status }: { status: ConnectionStatus }) => ({ status }),
    MMM_UPDATE_CONNECTION_STATUS_ERROR: (error: string) => error,
    MMM_UPDATE_SUBSCRIPTION_STATUS: ({ symbol, status }: { symbol: string, status: SubscriptionStatus }) => ({ symbol, status }),
    MMM_UPDATE_SUBSCRIPTION_STATUS_SUCCESS: ({ symbol, status }: { symbol: string, status: SubscriptionStatus }) => ({ symbol, status }),
    MMM_UPDATE_SUBSCRIPTION_STATUS_ERROR: (error: string) => error
 });