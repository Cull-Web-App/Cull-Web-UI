import { createActions } from 'redux-actions';

export const {
    initializeUserAvatar,
    initializeUserAvatarSuccess,
    initializeUserAvatarError
} = createActions({
    INITIALIZE_USER_AVATAR: undefined,
    INITIALIZE_USER_AVATAR_SUCCESS: (avatar: Blob) => avatar,
    INITIALIZE_USER_AVATAR_ERROR: (error: string) => error
 });