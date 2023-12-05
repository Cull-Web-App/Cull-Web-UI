import { createActions } from 'redux-actions';

export const {
    connectionOpened,
    connectionClosed,
    connectionError
} = createActions({
    CONNECTION_OPENED: undefined,
    CONNECTION_CLOSED: undefined,
    CONNECTION_ERROR: (error: string) => error
 });