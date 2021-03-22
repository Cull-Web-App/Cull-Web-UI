import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { CognitoUserSession } from "amazon-cognito-identity-js";
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IAuthService, IConfigService } from '../interfaces';
import { Tokens, User } from '../models';
import { injectable, inject } from 'inversify';
import { SERVICE_IDENTIFIERS } from '../constants';

@injectable()
export class CognitoAuthService implements IAuthService
{
    public constructor(
        @inject(SERVICE_IDENTIFIERS.ICONFIG_SERVICE) private readonly configService: IConfigService)
    {
    }

    /**
     * Configure the authentication for cognito
     * @param configOptions Config to apply
     */
    public configure(authConfigOptions: any = {}): Observable<any>
    {
        return this.configService.getAllConfiguration().pipe(
            map(({ envConfig: { AUTH_API } }) => {
                const { Auth, ...existingConfiguration }: any = Amplify.configure();
                return Amplify.configure({
                    ...existingConfiguration,
                    Auth: {
                        mandatorySignIn: true,
                        region: AUTH_API.REGION,
                        userPoolId: AUTH_API.USER_POOL_ID,
                        userPoolWebClientId: AUTH_API.APP_CLIENT_ID,
                        ...authConfigOptions
                    }
                });
            })
        );
    }

    public signUp(user: User): Observable<any>
    {
        return this.ensureConfigSet<any>(
            from(
                Auth.signUp({
                    username: user.email,
                    password: user.password as string
                })
            )
        );
    }

    public signIn(email: string, password: string): Observable<Partial<User>>
    {
        return this.ensureConfigSet<Partial<User>>(
            from(Auth.signIn(email, password)).pipe(
                map((response: { attributes: Partial<User> }) => ({
                    email: response.attributes.email,
                    email_verified: response.attributes.email_verified
                }))
            )
        );
    }

    public currentTokens(): Observable<Tokens>
    {
        return this.ensureConfigSet<Tokens>(
            from(Auth.currentSession()).pipe(
                map((sessionTokens: CognitoUserSession) => ({
                    idToken: sessionTokens.getIdToken().getJwtToken(),
                    accessToken: sessionTokens.getAccessToken().getJwtToken()
                }))
            )
        );
    }

    public logout(): Observable<any>
    {
        return this.ensureConfigSet<any>(
            from(Auth.signOut())
        );
    }

    private ensureConfigSet<T>(inner$: Observable<T>): Observable<T>
    {
        const amplifyConfiguration: any = Amplify.configure();

        if (!amplifyConfiguration)
        {
            return this.configure().pipe(
                switchMap(() => inner$)
            );
        }
        else
        {
            return inner$;
        }
    }
}
