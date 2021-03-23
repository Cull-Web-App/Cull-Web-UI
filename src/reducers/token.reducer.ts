import { Action, handleActions } from 'redux-actions';
import { authFailure, authRequest, authSuccess } from '../actions';
import { Tokens, TokenState } from '../models';

type TokenPayload = { tokens: Tokens; };

const initialState: TokenState = {
    tokens: {
        idToken: '',
        accessToken: ''
    },
    isAuthenticated: false,
    isLoading: true
};

export const tokens = handleActions<TokenState, TokenPayload>(
    {
        [authRequest.toString()]: (state: TokenState, action: Action<TokenPayload>) => ({
            ...state,
            isLoading: true,
            isAuthenticated: false
        }),
        [authSuccess.toString()]: (state: TokenState, { payload: { tokens } }: Action<TokenPayload>) => ({
            tokens,
            isAuthenticated: tokens !== undefined && tokens !== null,
            isLoading: false
        }),
        [authFailure.toString()]: (state: TokenState, action: Action<TokenPayload>) => ({
            ...state,
            isLoading: false
        })
    },
    initialState
);
