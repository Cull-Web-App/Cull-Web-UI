import { User, Tokens } from './user.model';

export interface LoginState
{
    loggedIn: boolean;
    loggingIn: boolean;
    user: User | null;
}

export interface RegistrationState
{
    registering: boolean;
    registered: boolean;
}

export interface TokenState
{
    tokens: Tokens | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}