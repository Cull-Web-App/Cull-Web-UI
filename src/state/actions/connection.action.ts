import { createActions } from 'redux-actions';
import { HubConnection } from '@microsoft/signalr';

export const {
    connectionOpened,
    connectionClosed,
    connectionError
} = createActions({
    CONNECTION_OPENED: (connection: HubConnection) => connection,
    CONNECTION_CLOSED: undefined,
    CONNECTION_ERROR: (error: string) => error
 });