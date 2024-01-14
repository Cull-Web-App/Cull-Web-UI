import { handleActions } from 'redux-actions';
import { initializePreferencesSuccess, initializePreferencesError } from '../actions';
import { IPreferencePartition } from '../partitions';

type PreferenceState = IPreferencePartition

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