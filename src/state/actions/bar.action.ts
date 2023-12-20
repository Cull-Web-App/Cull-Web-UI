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
    unsubscribeBarError,
    findManyBar,
    findManyBarSuccess,
    findManyBarError
} = createActions({
    BAR_CONNECT: undefined,
    BAR_CONNECT_SUCCESS: undefined,
    BAR_CONNECT_ERROR: (error: string) => error,
    BAR_DISCONNECT: undefined,
    BAR_DISCONNECT_SUCCESS: undefined,
    BAR_DISCONNECT_ERROR: (error: string) => error,
    RECEIVE_BAR: ({ bar }: { bar: IBar }) => ( {bar }),
    RECEIVE_BAR_SUCCESS: ({ symbol, bar }: { symbol: string, bar: IBar }) => ({ symbol, bar }),
    SUBSCRIBE_BAR: ({ symbol }: { symbol: string }) => ({ symbol }),
    SUBSCRIBE_BAR_SUCCESS: ({ symbol }) => ({ symbol }),
    SUBSCRIBE_BAR_ERROR: (error: string) => error,
    UNSUBSCRIBE_BAR: ({ symbol }: { symbol: string }) => ({ symbol }),
    UNSUBSCRIBE_BAR_SUCCESS: ({ symbol }: { symbol: string }) => ({ symbol }),
    UNSUBSCRIBE_BAR_ERROR: (error: string) => error,
    FIND_MANY_BAR: ({ symbol, from, to }: { symbol: string, from: Date, to: Date }) => ({ symbol, from, to }),
    FIND_MANY_BAR_SUCCESS: ({ symbol, bars }: { symbol: string, bars: IBar[] }) => ({ symbol, bars }),
    FIND_MANY_BAR_ERROR: (error: string) => error
 });