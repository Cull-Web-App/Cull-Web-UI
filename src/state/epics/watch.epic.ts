import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    initializeWatch,
    initializeWatchSuccess,
    initializeWatchError,
    createOneWatch,
    createOneWatchSuccess,
    createOneWatchError,
    deleteOneWatch,
    deleteOneWatchSuccess,
    deleteOneWatchError
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { IWatchService, Watch, container } from '../../common';
import { BaseEpic } from './base.epic';

export class WatchEpic extends BaseEpic {
    private readonly watchService!: IWatchService;

    public constructor() {
        super();
        this.watchService = container.get<IWatchService>(IDENTIFIERS.IWATCH_SERVICE);
        this.addEpics([this.initialize$, this.createOne$, this.deleteOne$]);
    }

    public initialize$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(initializeWatch),
        switchMap(() => {
            return this.watchService.findAll().pipe(
                map(watches => initializeWatchSuccess({ watches })),
                catchError(error => [
                    initializeWatchError(error)
                ])
            );
        })
    );

    public createOne$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(createOneWatch),
        switchMap(({ payload: { asset } }: { payload: { asset: string } }) => {
            return this.watchService.createOne(asset).pipe(
                map(_ => createOneWatchSuccess({ watch: new Watch({ symbol: asset, createdAt: new Date() }) })),
                catchError(error => [
                    createOneWatchError(error)
                ])
            );
        })
    );

    public deleteOne$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(deleteOneWatch),
        switchMap(({ payload: { asset } }: { payload: { asset: string } }) => {
            return this.watchService.deleteOne(asset).pipe(
                map(_ => deleteOneWatchSuccess({ asset })),
                catchError(error => [
                    deleteOneWatchError(error)
                ])
            );
        })
    );
}
