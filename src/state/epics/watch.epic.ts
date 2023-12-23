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
import { IWatchService, container } from '../../common';
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
                map(assets => initializeWatchSuccess({ payload: { assets } })),
                catchError(error => [
                    initializeWatchError(error)
                ])
            );
        })
    );

    public createOne$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(createOneWatch),
        switchMap(({ payload: { symbol } }: { payload: { symbol: string } }) => {
            return this.watchService.createOne(symbol).pipe(
                map(bars => createOneWatchSuccess({ symbol: symbol, bars })),
                catchError(error => [
                    createOneWatchError(error)
                ])
            );
        })
    );

    public deleteOne$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(deleteOneWatch),
        switchMap(({ payload: { symbol } }: { payload: { symbol: string } }) => {
            return this.watchService.deleteOne(symbol).pipe(
                map(bars => deleteOneWatchSuccess({ symbol: symbol, bars })),
                catchError(error => [
                    deleteOneWatchError(error)
                ])
            );
        })
    );
}
