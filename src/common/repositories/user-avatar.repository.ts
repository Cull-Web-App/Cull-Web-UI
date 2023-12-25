import { IUserAvatarRepository } from './iuser-avatar.repository';
import { injectable, inject } from 'inversify';
import { Observable, map } from 'rxjs';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IHttpRepository } from './ihttp.repository';
import { Asset, IAsset } from '../models';

@injectable()
export class UserAvatarRepository implements IUserAvatarRepository {
    private readonly url = 'https://graph.microsoft.com/v1.0/me/photo/$value';

    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;

    public findOne(): Observable<Blob> {
        return this.httpRepository.get<BlobPart>(this.url).pipe(
            map(d => new Blob([d.data], { type: 'image/jpeg' }))
        );
    }
}