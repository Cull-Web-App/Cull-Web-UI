import { handleActions } from 'redux-actions';
import { connectionClosed, connectionError, connectionOpened } from '../actions';
import { HubConnection } from '@microsoft/signalr';

interface ConnectionState {
    connection: HubConnection | null;
    opened: boolean;
    error: string | null;
}

const initialState: ConnectionState = {
    connection: null,
    opened: false,
    error: null
};

// TODO: fix anys
export const connection = handleActions<ConnectionState, string>(
    {
        [connectionOpened.toString()]: (state: ConnectionState, action: any) => ({
            connection: action.payload,
            opened: true,
            error: null
        }),
        [connectionClosed.toString()]: (state: ConnectionState) => ({
            ...state,
            opened: false,
            error: 'Connection closed' // Counting as an error since the server should not close the connection
        }),
        [connectionError.toString()]: (state: ConnectionState, action: any) => ({
            ...state,
            opened: false,
            error: 'Connection error'
        })
    },
    initialState
);