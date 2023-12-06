import { createActions } from 'redux-actions';

export const {
    barConnect,
    barConnectSuccess,
    barConnectError,
    barDisconnect,
    barDisconnectSuccess,
    barDisconnectError,
    receiveBar,
    subscribeBar,
    subscribeBarSuccess,
    subscribeBarError
} = createActions({
    BAR_CONNECT: undefined,
    BAR_CONNECT_SUCCESS: undefined,
    BAR_CONNECT_ERROR: (error: string) => error,
    BAR_DISCONNECT: undefined,
    BAR_DISCONNECT_SUCCESS: undefined,
    BAR_DISCONNECT_ERROR: (error: string) => error,
    RECEIVE_BAR: ({ symbol, price } ) => ({ symbol, price }),
    SUBSCRIBE_BAR: ({ symbol }) => ({ symbol }),
    SUBSCRIBE_BAR_SUCCESS: ({ symbol }) => ({ symbol }),
    SUBSCRIBE_BAR_ERROR: (error: string) => error
 });