import { Dispatch } from 'redux';
import { userConstants } from '../constants';
import { User, IAction } from '../models';
import { UserService, history } from '../services';
import { successAlert, errorAlert } from './alert.actions';

// Function to create register user
export const register = (user: User): ((dispatch: Dispatch<any>) => void) =>
{
    return async (dispatch: Dispatch<any>) => 
    {
        dispatch(<IAction> {
            type: userConstants.REGISTER_REQUEST,
            user: user
        });

        // Check type for this response
        try
        {
            // Should be a post so no real response
            await UserService.register(user);

            // Send success dispatches
            dispatch(<IAction> {
                type: userConstants.REGISTER_SUCCESS,
                user: user
            });

            // Dispatch the sucess
            dispatch(successAlert('Registration Success'));

            // Login after registration
            dispatch(login(user, false));
        }
        catch(error)
        {
            // Dispatch error actions
            dispatch(<IAction> {
                type: userConstants.REGISTER_ERROR,
                error: error
            });
            dispatch(errorAlert('Registration Failure'));
        }
    }
}

// Login function
export const login = (user: User, checked: boolean): ((dispatch: Dispatch<any>) => void) =>
{
    return async (dispatch: Dispatch<any>) =>
    {
        dispatch(<IAction> {
            type: userConstants.LOGIN_REQUEST,
            user: user
        });

        try
        {
            // User the service to login
            await UserService.login(user, checked);

            dispatch(<IAction> {
                type: userConstants.LOGIN_SUCCESS,
                user: user
            });

            dispatch(successAlert('Login Success'));

            // Send to the home route
            history.push('/home');            
        }
        catch(error)
        {
            dispatch(<IAction> {
                type: userConstants.LOGIN_FAILURE,
                error: error.toString()
            });

            dispatch(errorAlert('Login Error'));
        }
    }
}

// Logout function
export const logout = (): IAction =>
{
    // Call a service to remove the user from the store
    UserService.logout();
    history.push('/home');
    // Return sucessful logout action
    return <IAction> {
        type: userConstants.LOGOUT_SUCCESS
    };
}