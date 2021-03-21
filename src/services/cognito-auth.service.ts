import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    public configure(authConfigOptions: any): Observable<any>
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
        return from(
            Auth.signUp({
                username: user.email,
                password: user.password as string
            })
        );
    }

    public signIn(email: string, password: string): Observable<{ email: string; email_verified: boolean }>
    {
        return from(Auth.signIn(email, password)).pipe(
            map(response => ({
                email: response.attributes.email,
                email_verified: response.attributes.email_verified
            }))
        );
    }

    public currentTokens(): Observable<Tokens>
    {
        return from(Auth.currentSession()).pipe(
            map(sessionTokens => ({
                idToken: sessionTokens.getIdToken().getJwtToken(),
                accessToken: sessionTokens.getAccessToken().getJwtToken()
            }))
        );
    }

    public logout(): Observable<any>
    {
        // Invalidate the Auth token from cognito
        return from(Auth.signOut());
    }
}
