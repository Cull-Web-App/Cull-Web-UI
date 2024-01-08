import { handleActions } from 'redux-actions';
import { initializeUserAvatarSuccess, initializeUserAvatarError } from '../actions';

interface UserState {
    avatar: Blob | null;
    error: string | null;
}

const initialState: UserState = {
    avatar: null,
    error: null
};

// TODO: fix anys
export const user = handleActions<UserState, string>(
    {
        [initializeUserAvatarSuccess.toString()]: (state: UserState, { payload: { avatar } }: any) => ({
            avatar: avatar,
            error: null
        }),
        [initializeUserAvatarError.toString()]: (state: UserState, action: any) => ({
            avatar: null,
            error: action.payload
        }),
    },
    initialState
);