import { ofType, Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { registerRequest, registerError, registerSuccess, successAlert, loginRequest, errorAlert, loginFailure, loginSuccess, authRequest, authSuccess, authFailure, logoutRequest, logoutSuccess } from '../actions';
import { User, Tokens } from '../models';
import { UserService, history } from '../services';

// TODO: Remove anys
export const register$: Epic<any> = (actions$: ActionsObservable<any>, state$: StateObservable<any>) => actions$.pipe(
    ofType(registerRequest),
    switchMap((user: User) => {
        return from(UserService.register(user)).pipe(
            map(_ => [
                registerSuccess(user),
                successAlert('Registration Success'),
                loginRequest(user, false)
            ])
        );
    }),
    catchError(error => [
        registerError(),
        errorAlert('Registration Failed')
    ])
);

export const login$: Epic<any> = (actions$: ActionsObservable<any>, state$: StateObservable<any>) => actions$.pipe(
    ofType(loginRequest),
    switchMap(({ user, checked }) => {
        return from(UserService.login(user, checked)).pipe(
            map((user: User) => {
                history.push('/home');
                return [
                    successAlert('Login Successful'),
                    loginSuccess(user),
                    authRequest(user)
                ];
            })
        )
    }),
    catchError(error => {
        console.error(error.toString());
        return of(loginFailure);
    })
);

export const auth$: Epic<any> = (actions$: ActionsObservable<any>, state$: StateObservable<any>) => actions$.pipe(
    ofType(authRequest),
    switchMap((user: User) => {
        return from(UserService.currentTokens()).pipe(
            map((tokens: Tokens) => authSuccess(tokens))
        );
    }),
    catchError(error => {
        console.error(error.toString());
        return of(authFailure);
    })
);

export const logout$: Epic<any> = (actions$: ActionsObservable<any>, state$: StateObservable<any>) => actions$.pipe(
    ofType(logoutRequest),
    map((_) => {
        UserService.logout();
        history.push('/home');
        return logoutSuccess();
    })
);
