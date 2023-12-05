import { Action } from 'redux';
import { handleActions } from 'redux-actions';
import { registerError, registerRequest, registerSuccess } from '../actions';
import { RegistrationState } from '../models';

const initialState: RegistrationState = {
    registering: false,
    registered: false
};

export const registration = handleActions<RegistrationState, string>(
    {
        [registerRequest.toString()]: (state: RegistrationState, action: Action<string>) => ({
            registering: true,
            registered: false
        }),
        [registerSuccess.toString()]: (state: RegistrationState, action: Action<string>) => ({
            registering: false,
            registered: true
        }),
        [registerError.toString()]: (state: RegistrationState, action: Action<string>) => ({
            registering: false,
            registered: false
        })
    },
    initialState
);
