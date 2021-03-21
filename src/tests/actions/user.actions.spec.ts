import { register, login, logout } from '../../actions';
import { userConstants } from '../../constants';
import { User, IAction } from '../../models';
import { UserService } from '../../services';
import { Dispatch } from 'redux';

describe('User actions', () =>
{
    const user: User = {
        email: 'test@gmail.com',
        email_verified: false,
        password: '1234567'
    };

    const mockDispatch: Dispatch<any> = jest.fn();

    it('should register new user', async () =>
    {
        UserService.register = jest.fn((user: User) => Promise.resolve({}));
        const res: any = await register(user)(mockDispatch);

        expect(UserService.register).toBeCalled();
        expect(mockDispatch).toBeCalledWith(<IAction> {
            type: userConstants.REGISTER_SUCCESS,
            user: user
        });
    });

    it('should error on user registration', async () =>
    {
        UserService.register = jest.fn((user: User) => Promise.reject("ERR"));
        const res: any = await register(user)(mockDispatch);

        expect(UserService.register).toBeCalled();
        expect(mockDispatch).toBeCalledWith(<IAction> {
            type: userConstants.REGISTER_ERROR,
            error: "ERR"
        });
    });

    it('should login user', async () =>
    {
        UserService.login = jest.fn((user: User) => Promise.resolve(user));
        const res: any = await login(user, false)(mockDispatch);

        expect(UserService.login).toBeCalled();
        expect(mockDispatch).toBeCalledWith(<IAction> {
            type: userConstants.LOGIN_SUCCESS,
            user: user
        });
    });

    it('should have error logining in user', async () =>
    {
        UserService.login = jest.fn((user: User) => Promise.reject("ERR"));
        const res: any = await login(user, false)(mockDispatch);

        expect(UserService.login).toBeCalled();
        expect(mockDispatch).toBeCalledWith(<IAction> {
            type: userConstants.LOGIN_FAILURE,
            error: "ERR"
        });
    });

    it('should logout user', async () =>
    {
        UserService.logout = jest.fn(async () => new Promise<void>(() => {}));
        const res: any = await logout();

        expect(UserService.logout).toBeCalled();
        expect(res).toEqual(<IAction> {
            type: userConstants.LOGOUT_SUCCESS
        });
    });
});