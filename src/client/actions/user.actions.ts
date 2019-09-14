import { userConstants } from '../constants';
import { User, IAction } from '../models';
import { UserService } from '../services';
import { alertActions } from './alert.actions';
import { Dispatch } from 'redux';
import { history } from '../services';

// Interfaces for the models
interface IUserActions
{
    register: (user: User) => ((dispatch: Dispatch<any>) => void),
    login: (user: User, checked: boolean) => ((dispatch: Dispatch<any>) => void),
    logout: () => IAction
}

// Export the user actions
export const userActions: IUserActions =
{
    register: register,
    login: login,
    logout: logout
};

// Function to create register user
function register(user: User): (dispatch: Dispatch<any>) => void
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
            dispatch(alertActions.success('Registration Success'));

            // Login after registration
            dispatch(userActions.login(user, false));
        }
        catch(error)
        {
            // Dispatch error actions
            dispatch(<IAction> {
                type: userConstants.REGISTER_ERROR,
                error: error
            });
            dispatch(alertActions.error('Registration Failure'));
        }
    }
}

// Login function
function login(user: User, checked: boolean): (dispatch: Dispatch<any>) => void
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

            dispatch(alertActions.success('Login Success'));

            // Send to the home route
            history.push('/home');            
        }
        catch(error)
        {
            dispatch(<IAction> {
                type: userConstants.LOGIN_FAILURE,
                error: error.toString()
            });

            dispatch(alertActions.error('Login Error'));
        }
    }
}

// Logout function
function logout(): IAction 
{
    // Call a service to remove the user from the store
    UserService.logout();
    history.push('/home');
    // Return sucessful logout action
    return <IAction> {
        type: userConstants.LOGOUT_SUCCESS
    };
}