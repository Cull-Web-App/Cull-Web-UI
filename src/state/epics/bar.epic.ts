import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap, withLatestFrom, mergeMap, concatMap } from 'rxjs/operators';
import {
    barConnect,
    barConnectSuccess,
    barConnectError,
    barDisconnect,
    barDisconnectSuccess,
    barDisconnectError,
    receiveBar,
    subscribeBar,
    subscribeBarSuccess,
    subscribeBarError,
    receiveBarSuccess,
    unsubscribeBar,
    unsubscribeBarSuccess,
    unsubscribeBarError,
    findManyBar,
    findManyBarSuccess,
    findManyBarError,
    updateConnectionStatus,
    updateConnectionStatusSuccess
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { ConnectionStatus, IBar, IBarService, container } from '../../common';
import { EMPTY, of } from 'rxjs';
import { BaseEpic } from './base.epic';

export class BarEpic extends BaseEpic {
    private readonly barService!: IBarService;

    public constructor() {
        super();
        this.barService = container.get<IBarService>(IDENTIFIERS.IBAR_SERVICE);
        this.addEpics([
            this.connect$,
            this.disconnect$,
            this.subscribeBar$,
            this.receiveBar$,
            this.unsubscribeBar$,
            this.findMany$,
            this.updateConnectionStatus$
        ]);
    }

    public connect$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(barConnect),
        withLatestFrom(
            state$.pipe(map(state => state.bar.connectionStatus))
        ),
        concatMap(([_, connectionStatus]: [unknown, ConnectionStatus]) => {
            if (connectionStatus === ConnectionStatus.Connecting) {
                return EMPTY;
            } else if (connectionStatus === ConnectionStatus.Connected) {
                return of(barConnectSuccess());
            }

            store.dispatch(updateConnectionStatus({ status: ConnectionStatus.Connecting }));
            return this.barService.connect().pipe(
                map(_ => {
                    this.barService.registerAll(new Map<string, (...args: any[]) => void>([
                        ['ReceiveBar', (bar: IBar) => store.dispatch(receiveBar({ bar }))]
                    ]));
                    return barConnectSuccess()
                }),
                catchError(error => [
                    barConnectError(error)
                ])
            );
        })
    );

    public disconnect$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(barDisconnect),
        withLatestFrom(
            state$.pipe(map(state => state.bar.connectionStatus))
        ),
        concatMap(([_, connectionStatus]: [unknown, ConnectionStatus]) => {
            if (connectionStatus === ConnectionStatus.Disconnecting) {
                return EMPTY;
            } else if (connectionStatus === ConnectionStatus.Disconnected) {
                return of(barDisconnectSuccess());
            }

            store.dispatch(updateConnectionStatus({ status: ConnectionStatus.Disconnecting }));
            return this.barService.disconnect().pipe(
                map(_ => {
                    this.barService.deregisterAll(new Map<string, (...args: any[]) => void>([
                        ['ReceiveBar', () => EMPTY]
                    ]));
                }),
                catchError(error => [
                    barDisconnectError(error)
                ])
            );
        })
    );

    public subscribeBar$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(subscribeBar),
        withLatestFrom(
            state$.pipe(map(state => state.bar.subscribersPerSymbol))
        ),
        concatMap(([{ payload: { symbol }}, subscribersPerSymbol]: [{ payload: { symbol: string } }, Map<string, number>]) => {
            if ((subscribersPerSymbol.get(symbol) || 0) > 0) {
                return of(subscribeBarSuccess({ symbol }));
            }
            return this.barService.subscribe(symbol).pipe(
                map(_ => subscribeBarSuccess({ symbol })),
                catchError(error => [
                    subscribeBarError(error)
                ])
            );
        })
    );

    public unsubscribeBar$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(unsubscribeBar),
        withLatestFrom(
            state$.pipe(map(state => state.bar.subscribersPerSymbol))
        ),
        concatMap(([{ payload: { symbol }}, subscribersPerSymbol]: [{ payload: { symbol: string } }, Map<string, number>]) => {
            if ((subscribersPerSymbol.get(symbol) || 0) > 1) {
                return of(unsubscribeBarSuccess({ symbol }));
            }
            return this.barService.unsubscribe(symbol).pipe(
                map(_ => unsubscribeBarSuccess({ symbol })),
                catchError(error => [
                    unsubscribeBarError(error)
                ])
            );
        })
    );

    public receiveBar$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(receiveBar),
        switchMap(({ payload: { bar } }: { payload: { bar: IBar } }) => {
            return of(receiveBarSuccess({ symbol: bar.symbol, bar }));
        })
    );

    public findMany$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(findManyBar),
        switchMap(({ payload: { symbol, from, to } }: { payload: { symbol: string, from: Date, to: Date } }) => {
            return this.barService.findMany(symbol, from, to).pipe(
                map(bars => findManyBarSuccess({ symbol: symbol, bars })),
                catchError(error => [
                    findManyBarError(error)
                ])
            );
        })
    );

    public updateConnectionStatus$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(updateConnectionStatus),
        switchMap(({ payload: { status } }: { payload: { status: ConnectionStatus } }) => {
            return of(updateConnectionStatusSuccess({ status }));
        })
    );
}
