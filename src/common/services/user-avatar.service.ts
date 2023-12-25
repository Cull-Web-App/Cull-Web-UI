import { injectable, inject } from 'inversify';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IUserAvatarService } from "./iuser-avatar.service";
import { IUserAvatarRepository } from 'common/repositories';
import { Observable } from 'rxjs';

@injectable()
export class UserAvatarService implements IUserAvatarService {
    @inject(IDENTIFIERS.IUSERAVATAR_REPOSITORY) private readonly userAvatarRepository!: IUserAvatarRepository;

    public findOne(): Observable<Blob> {
        return this.userAvatarRepository.findOne();
    }
}