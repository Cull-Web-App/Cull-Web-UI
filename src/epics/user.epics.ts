import { ofType, Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    registerRequest,
    registerError,
    registerSuccess,
    successAlert,
    loginRequest,
    errorAlert, 
    loginFailure,
    loginSuccess,
    authRequest,
    authSuccess,
    authFailure, 
    logoutRequest,
    logoutSuccess
} from '../actions';
import { IAuthService, IUserService } from '../interfaces';
import { User, Tokens } from '../models';
import { history } from '../services';
import { SERVICE_IDENTIFIERS } from '../constants';
import { useInjection } from '../hooks';

// TODO: Remove anys
export const register$: Epic<any> = (actions$: ActionsObservable<any>, state$: StateObservable<any>) => actions$.pipe(
    ofType(registerRequest),
    switchMap((user: User) => {
        // Retrieve the UserService -- can I use hooks in the epics?
        const userService: IUserService = useInjection<IUserService>(SERVICE_IDENTIFIERS.IUSER_SERVICE);
        return userService.register(user).pipe(
            map(_ => [
                registerSuccess(user),
                successAlert('Registration Success'),
                loginRequest(user, false)
            ]),
            catchError(error => [
                registerError(),
                errorAlert('Registration Failed')
            ])
        );
    })
);

export const login$: Epic<any> = (actions$: ActionsObservable<any>, state$: StateObservable<any>) => actions$.pipe(
    ofType(loginRequest),
    switchMap(({ user, checked }) => {
        const userService: IUserService = useInjection<IUserService>(SERVICE_IDENTIFIERS.IUSER_SERVICE);
        return userService.login(user, checked).pipe(
            map((user: Partial<User>) => {
                history.push('/home');
                return [
                    successAlert('Login Successful'),
                    loginSuccess(user),
                    authRequest(user)
                ];
            }),
            catchError(error => {
                console.error(error.toString());
                return of(loginFailure);
            })
        )
    })
);

export const auth$: Epic<any> = (actions$: ActionsObservable<any>, state$: StateObservable<any>) => actions$.pipe(
    ofType(authRequest),
    switchMap(() => {
        const authService: IAuthService = useInjection<IAuthService>(SERVICE_IDENTIFIERS.IAUTH_SERVICE);
        return authService.currentTokens().pipe(
            map((tokens: Tokens) => authSuccess(tokens)),
            catchError(error => {
                console.error(error.toString());
                return of(authFailure);
            })
        );
    })
);

export const logout$: Epic<any> = (actions$: ActionsObservable<any>, state$: StateObservable<any>) => actions$.pipe(
    ofType(logoutRequest),
    switchMap(() => {
        const userService: IUserService = useInjection<IUserService>(SERVICE_IDENTIFIERS.IUSER_SERVICE);
        return userService.logout().pipe(
            map(() => {
                history.push('/home');
                return logoutSuccess();
            })
        );
    })
);
