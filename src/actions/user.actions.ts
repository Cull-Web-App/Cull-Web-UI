import { User } from '../models';
import { createActions } from 'redux-actions';

export const {
    registerRequest,
    registerSuccess, 
    registerError,
    loginRequest,
    loginSuccess,
    loginFailure,
    authRequest,
    authSuccess,
    authFailure,
    logoutRequest,
    logoutSuccess
} = createActions({
    REGISTER_REQUEST: (user: User) => user,
    REGISTER_SUCCESS: (user: User) => user,
    REGISTER_ERROR: (user: User) => user,
    LOGIN_REQUEST: (user: User, checked: boolean) => ({
        user,
        checked
    }),
    LOGIN_SUCCESS: (user: User) => user,
    LOGIN_FAILURE: (user: User) => user,
    AUTH_REQUEST: (user: User) => user,
    AUTH_SUCCESS: (tokens) => tokens,
    AUTH_FAILURE: (user: User) => user,
    LOGOUT_REQUEST: undefined,
    LOGOUT_SUCCESS: undefined
 });
