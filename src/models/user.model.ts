export interface User
{
    email: string;
    email_verified: boolean;
    password?: string;
}

export interface Tokens
{
    idToken: string;
    accessToken: string;
}