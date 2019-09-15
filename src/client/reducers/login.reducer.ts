import { userConstants } from '../constants';
import { User, LoginState, IAction } from '../models';

const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : JSON.parse(sessionStorage.getItem('user') as string);
const initialState: LoginState = user ? { loggedIn: true, user: user } : { loggedIn: false };

export const login = (state: LoginState = initialState, action: IAction): LoginState =>
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