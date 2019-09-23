import Auth from '@aws-amplify/auth';
import { userConstants } from '../constants';
import { User, LoginState, IUserAction } from '../models';

// Create the initial state -- async to get the user info
let initialState: LoginState = {};
const setInitialState = async () =>
{
    try
    {
        const user: User | undefined = await Auth.currentAuthenticatedUser();
        initialState = user ? { loggedIn: true, user: user } : { loggedIn: false };
    }
    catch (error)
    {
        initialState = { loggedIn: false };
        console.error(error);
    }
}
setInitialState();

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