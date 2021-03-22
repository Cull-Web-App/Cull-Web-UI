import { login } from '../../reducers';
import { userConstants } from '../../constants';
import { User, LoginState, IUserAction } from '../../models';

describe('Login reducer', () =>
{
    it('should work', () =>
    {
        const user: User = {
            email: 'test@gmail.com',
            email_verified: true,
            password: '1234567'
        };

        const state: LoginState = {
            loggedIn: true,
            user: user
        };

        expect(login(state, <IUserAction> {
            type: userConstants.LOGIN_REQUEST,
            user: user
        })).toEqual(<LoginState> {
            loggingIn: true,
            user: user
        });

        expect(login(state, <IUserAction> {
            type: userConstants.LOGIN_SUCCESS,
            user: user
        })).toEqual(<LoginState> {
            loggedIn: true,
            user: user
        });

        expect(login(state, <IUserAction> {
            type: userConstants.LOGIN_FAILURE,
        })).toEqual({});

        expect(login(state, <IUserAction> {
            type: userConstants.LOGOUT_SUCCESS,
        })).toEqual({});

        expect(login(state, <IUserAction> {})).toEqual(state);
    });
});