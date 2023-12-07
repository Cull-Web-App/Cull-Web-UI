import { createActions } from 'redux-actions';

export const {
    initializePreferences,
    initializePreferencesSuccess,
    initializePreferencesError
} = createActions({
    INITIALIZE_PREFERENCES: undefined,
    INITILIAZE_PREFERENCES_SUCCESS: (darkMode: boolean) => ({ darkMode }),
    INITIALIZE_PREFERENCES_ERROR: (error: string) => error,
 });