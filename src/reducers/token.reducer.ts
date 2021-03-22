import { TokenState } from '../models';

const initialState: TokenState = {
    tokens: {
        idToken: '',
        accessToken: ''
    },
    isAuthenticated: false,
    isLoading: true
};

export const tokens = (state: TokenState = initialState, action: ITokenAction): TokenState =>
{
    switch (action.type)
    {
        case userConstants.AUTH_SUCCESS:
            return <TokenState> {
                tokens: action.tokens,
                isAuthenticated: action.tokens !== undefined,
                isLoading: false
            };
        case userConstants.AUTH_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}