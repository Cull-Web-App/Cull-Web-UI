import { IBar } from '../../common';
import { createActions } from 'redux-actions';

export const {
    barConnect,
    barConnectSuccess,
    barConnectError,
    barDisconnect,
    barDisconnectSuccess,
    barDisconnectError,
    receiveBar,
    receiveBarSuccess,
    subscribeBar,
    subscribeBarSuccess,
    subscribeBarError,
    unsubscribeBar,
    unsubscribeBarSuccess,
    unsubscribeBarError
} = createActions({
    BAR_CONNECT: undefined,
    BAR_CONNECT_SUCCESS: undefined,
    BAR_CONNECT_ERROR: (error: string) => error,
    BAR_DISCONNECT: undefined,
    BAR_DISCONNECT_SUCCESS: undefined,
    BAR_DISCONNECT_ERROR: (error: string) => error,
    RECEIVE_BAR: ({ bar }: { bar: IBar }) => ( {bar }),
    RECEIVE_BAR_SUCCESS: ({ symbol, bar }: { symbol: string, bar: IBar }) => ({ symbol, bar }),
    SUBSCRIBE_BAR: ({ symbol }) => ({ symbol }),
    SUBSCRIBE_BAR_SUCCESS: ({ symbol }) => ({ symbol }),
    SUBSCRIBE_BAR_ERROR: (error: string) => error,
    UNSUBSCRIBE_BAR: ({ symbol }) => ({ symbol }),
    UNSUBSCRIBE_BAR_SUCCESS: ({ symbol }) => ({ symbol }),
    UNSUBSCRIBE_BAR_ERROR: (error: string) => error,
 });