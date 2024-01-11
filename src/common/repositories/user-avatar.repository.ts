import { IUserAvatarRepository } from './iuser-avatar.repository';
import { injectable, inject } from 'inversify';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IHttpRepository } from './ihttp.repository';
import { IPublicClientApplication } from '@azure/msal-browser';
import { scopeMap } from '../config';
import { AxiosError } from 'axios';

@injectable()
export class UserAvatarRepository implements IUserAvatarRepository {
    private readonly url = 'https://graph.microsoft.com/v1.0/users/{userPrincipalName}/photo/$value';

    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;
    @inject(IDENTIFIERS.IMSAL_INSTANCE) private readonly msalInstance!: IPublicClientApplication;

    public findOne(): Observable<Blob> {
        const baseUrl = new URL(this.url).origin;
        const scopes = scopeMap.get(baseUrl);
        if (!scopes) {
            throw new Error(`No scopes found for ${baseUrl}`);
        }

        const account = this.msalInstance.getAllAccounts()[0];
        if (!account) {
            throw new Error('No account found');
        }

        return from(this.msalInstance.acquireTokenSilent({ scopes, account })).pipe(
            switchMap(_ => this.httpRepository.get<BlobPart>(this.url.replace('{userPrincipalName}', account.username))),
            map(d => new Blob([d.data], { type: 'image/jpeg' })),
            catchError((e: AxiosError) => {
                if (e.response?.status === 404 && !!e.response?.data) {
                    const errorData = e.response.data as { error: { code: string } };
                    if (errorData.error.code === 'ErrorEntityNotFound') {
                        return throwError(() => new Error('No avatar found').toString());
                    }
                }

                return throwError(() => e.toString());
            })
        );
    }
}