import { createActions } from 'redux-actions';

export const {
    initializePreferences,
    initializePreferencesSuccess,
    initializePreferencesError
} = createActions({
    INITIALIZE_PREFERENCES: undefined,
    INITIALIZE_PREFERENCES_SUCCESS: ({ darkMode }: { darkMode: boolean }) => ({ darkMode }),
    INITIALIZE_PREFERENCES_ERROR: (error: string) => error
 });