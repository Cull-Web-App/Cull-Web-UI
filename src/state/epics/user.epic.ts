import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    initializeUserAvatar,
    initializeUserAvatarSuccess,
    initializeUserAvatarError,
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { container } from '../../common/ioc/container.ioc';
import { IUserAvatarService } from '../../common';
import { BaseEpic } from './base.epic';

export class UserEpic extends BaseEpic {
    private readonly userAvatarService!: IUserAvatarService;

    public constructor() {
        super();
        this.userAvatarService = container.get<IUserAvatarService>(IDENTIFIERS.IUSERAVATAR_SERVICE);
        this.addEpics([this.initializeAvatar$]);
    }

    public initializeAvatar$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(initializeUserAvatar),
        switchMap(() => {
            return this.userAvatarService.findOne().pipe(
                map(avatar => initializeUserAvatarSuccess({ avatar })),
                catchError(error => [
                    initializeUserAvatarError(error)
                ])
            );
        })
    );
}
