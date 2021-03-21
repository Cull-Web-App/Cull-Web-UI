import { Observable } from "rxjs";
import { Tokens, User } from "../models";

export interface IAuthService
{
    configure(authConfigOptions: any): Observable<any>;
    signUp(user: User): Observable<any>;
    signIn(email: string, password: string): Observable<{ email: string; email_verified: boolean }>;
    currentTokens(): Observable<Tokens>;
    logout(): Observable<any>;
}
