import { handleActions } from 'redux-actions';
import { initializePreferencesSuccess, initializePreferencesError } from '../actions';

interface PreferenceState {
    darkMode: boolean;
    error: string | null;
}

const initialState: PreferenceState = {
    darkMode: false,
    error: null
};

// TODO: fix anys
export const preference = handleActions<PreferenceState, string>(
    {
        [initializePreferencesSuccess.toString()]: (state: PreferenceState, { payload: { darkMode } }: any) => ({
            darkMode: darkMode,
            error: null
        }),
        [initializePreferencesError.toString()]: (state: PreferenceState, action: any) => ({
            ...state,
            error: action.payload
        })
    },
    initialState
);