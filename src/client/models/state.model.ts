import { User, Tokens } from './user.model';

export interface LoginState
{
    loggedIn?: boolean;
    loggingIn?: boolean;
    user?: User;
}

export interface RegistrationState
{
    registering?: boolean;
    registered?: boolean;
}

export interface TokenState
{
    tokens: Tokens;
    isAuthenticated: boolean;
    isLoading: boolean;
}