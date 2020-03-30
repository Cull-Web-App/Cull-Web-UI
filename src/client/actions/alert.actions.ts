import { createActions } from 'redux-actions';

// Define redux action functions
export const { successAlert, errorAlert, clearAlert } = createActions({
    SUCCESS_ALERT: (message: string) => message,
    ERROR_ALERT: (message: string) => message,
    CLEAR_ALERT: (message: string) => message
});
