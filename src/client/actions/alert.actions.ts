import { alertConstants } from '../constants';
import { IAction } from '../models';

// Define redux action functions
export const successAlert = (message: string): IAction =>
{
    return {
        type: alertConstants.SUCCESS,
        message: message
    };
}

export const errorAlert = (message: string): IAction =>
{
    return {
        type: alertConstants.ERROR,
        message: message
    };
}

export const clearAlert = (message: string): IAction =>
{
    return {
        type: alertConstants.CLEAR,
        message: message
    }
}
