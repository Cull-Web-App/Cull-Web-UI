import Auth from '@aws-amplify/auth';
import { userConstants } from '../constants';
import { User, LoginState, IUserAction } from '../models';

// Create the initial state -- async to get the user info
const initialState: LoginState = {
    loggedIn: false
};

export const login = (state: LoginState = initialState, action: IUserAction): LoginState =>
{
    // Go through possible states for authentication
    switch (action.type)
    {
        case userConstants.LOGIN_REQUEST:
            return <LoginState> {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return <LoginState> {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return <LoginState> {};
        case userConstants.LOGOUT_SUCCESS:
            return <LoginState> {};
        default:
            return state;
    }
}