import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import {
    initializeWatch,
    initializeWatchSuccess,
    initializeWatchError,
    createOneWatch,
    createOneWatchSuccess,
    createOneWatchError,
    deleteOneWatch,
    deleteOneWatchSuccess,
    deleteOneWatchError,
    updateManyWatch,
    updateManyWatchSuccess,
    updateManyWatchError,
    findManyAssets,
    createManyWatch,
    createManyWatchSuccess,
    createManyWatchError,
    deleteManyWatch,
    deleteManyWatchSuccess,
    deleteManyWatchError
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { IAsset, IWatch, IWatchService, Watch, container } from '../../common';
import { BaseEpic } from './base.epic';

export class WatchEpic extends BaseEpic {
    private readonly watchService!: IWatchService;

    public constructor() {
        super();
        this.watchService = container.get<IWatchService>(IDENTIFIERS.IWATCH_SERVICE);
        this.addEpics([
            this.initialize$,
            this.createOne$,
            this.createMany$,
            this.deleteOne$,
            this.deleteMany$,
            this.updateMany$,
            this.initializeAssetsAfterWatchSuccess$
        ]);
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

    public initializeAssetsAfterWatchSuccess$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(initializeWatchSuccess),
        withLatestFrom(
            state$.pipe(
                map(state => new Map<string, IAsset>(Object.entries(state.asset.assets)))
            )
        ),
        map(([{ payload: { watches } }, assets]: [{ payload: { watches: IWatch[] } }, Map<string, IAsset>]) => {
            const watchesWithoutAsset = watches.filter((watch: IWatch) => !assets.has(watch.symbol));

            // Look up these assets
            return findManyAssets({ symbols: watchesWithoutAsset.map((watch: IWatch) => watch.symbol) });
        })
    );

    public createOne$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(createOneWatch),
        switchMap(({ payload: { symbol, position } }: { payload: { symbol: string, position: number } }) => {
            return this.watchService.createOne(symbol, position).pipe(
                map(_ => createOneWatchSuccess({ watch: new Watch({ symbol: symbol, position, createdAt: new Date() }) })),
                catchError(error => [
                    createOneWatchError(error)
                ])
            );
        })
    );

    public createMany$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(createManyWatch),
        switchMap(({ payload: { watches } }: { payload: { watches: IWatch[] } }) => {
            return this.watchService.createMany(watches).pipe(
                map(_ => createManyWatchSuccess({ watches })),
                catchError(error => [
                    createManyWatchError(error)
                ])
            );
        })
    );

    public deleteOne$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(deleteOneWatch),
        switchMap(({ payload: { symbol } }: { payload: { symbol: string } }) => {
            return this.watchService.deleteOne(symbol).pipe(
                map(_ => deleteOneWatchSuccess({ symbol })),
                catchError(error => [
                    deleteOneWatchError(error)
                ])
            );
        })
    );

    public deleteMany$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(deleteManyWatch),
        switchMap(({ payload: { symbols } }: { payload: { symbols: string[] } }) => {
            return this.watchService.deleteMany(symbols).pipe(
                map(_ => deleteManyWatchSuccess({ symbols })),
                catchError(error => [
                    deleteManyWatchError(error)
                ])
            );
        })
    );

    public updateMany$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(updateManyWatch),
        switchMap(({ payload: { watches } }: { payload: { watches: IWatch[] } }) => {
            return this.watchService.updateMany(watches).pipe(
                map(newWatches => updateManyWatchSuccess({ watches: newWatches })),
                catchError(error => [
                    updateManyWatchError(error)
                ])
            );
        })
    );
}
