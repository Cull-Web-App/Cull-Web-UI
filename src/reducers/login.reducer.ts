import { loginFailure, loginRequest, loginSuccess, logoutSuccess } from '../actions';
import { User, LoginState } from '../models';
import { handleActions } from 'redux-actions';
import { Action } from 'redux';

type UserPayload = { user: User; };

type CombinedPayloadType = string | UserPayload;

const initialState: LoginState = {
    loggedIn: false,
    loggingIn: false,
    user: null
};

// TODO: fix the anys here
export const login = handleActions<LoginState, CombinedPayloadType>(
    {
        [loginRequest.toString()]: (state: LoginState, { payload: { user } }: any) => ({
            loggingIn: true,
            loggedIn: false,
            user
        }),
        [loginSuccess.toString()]: (state: LoginState, { payload: { user } }: any) => ({
            loggedIn: true,
            loggingIn: false,
            user
        }),
        [loginFailure.toString()]: (state: LoginState, action: Action<CombinedPayloadType>) => ({
            ...initialState
        }),
        [logoutSuccess.toString()]: (state: LoginState, action: Action<CombinedPayloadType>) => ({
            ...initialState
        })
    },
    initialState
);
