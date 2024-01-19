import { ofType, Epic } from 'redux-observable';
import { map, catchError, filter, switchMap, withLatestFrom, mergeMap, concatMap, take } from 'rxjs/operators';
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
    updateConnectionStatusBar,
    updateConnectionStatusBarSuccess,
    updateSubscriptionStatusBarSuccess,
    updateSubscriptionStatusBar
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { ConnectionStatus, IBar, IBarService, SubscriptionStatus, container } from '../../common';
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
            this.updateConnectionStatus$,
            this.updateSubscriptionStatus$
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

            store.dispatch(updateConnectionStatusBar({ status: ConnectionStatus.Connecting }));
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

            store.dispatch(updateConnectionStatusBar({ status: ConnectionStatus.Disconnecting }));
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

    public subscribeBar$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(subscribeBar),
        withLatestFrom(
            state$.pipe(
                map(state => new Map<string, SubscriptionStatus>(Object.entries(state.bar.subscriptionStatusPerSymbol)))
            )
        ),
        concatMap(([{ payload: { symbol } }, subscriptionStatus]: [{ payload: { symbol: string } }, Map<string, SubscriptionStatus>]) => {
            const currentSubscriptionStatus = subscriptionStatus.get(symbol) ?? SubscriptionStatus.Unsubscribed;
            if (currentSubscriptionStatus === SubscriptionStatus.Subscribed || currentSubscriptionStatus === SubscriptionStatus.Subscribing) {
                return EMPTY;
            }

            // Need to update the subscription status here -- this is because the subscribe method can take time
            // and we don't want to send multiple subscribe requests when one is already in progress
            store.dispatch(updateSubscriptionStatusBar({ symbol, status: SubscriptionStatus.Subscribing }));
            return this.barService.subscribe(symbol).pipe(
                map(_ => subscribeBarSuccess({ symbol })),
                catchError(error => [
                    subscribeBarError(error)
                ])
            );
        })
    );

    public unsubscribeBar$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(unsubscribeBar),
        withLatestFrom(
            state$.pipe(
                map(state => new Map<string, SubscriptionStatus>(Object.entries(state.bar.subscriptionStatusPerSymbol)))
            )
        ),
        concatMap(([{ payload: { symbol } }, subscriptionStatus]: [{ payload: { symbol: string } }, Map<string, SubscriptionStatus>]) => {
            const currentSubscriptionStatus = subscriptionStatus.get(symbol) ?? SubscriptionStatus.Unsubscribed;
            if (currentSubscriptionStatus === SubscriptionStatus.Unsubscribed || currentSubscriptionStatus === SubscriptionStatus.Unsubscribing) {
                return EMPTY;
            }

            // Need to update the subscription status here -- this is because the subscribe method can take time
            // and we don't want to send multiple subscribe requests when one is already in progress
            store.dispatch(updateSubscriptionStatusBar({ symbol, status: SubscriptionStatus.Unsubscribing }));
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
        concatMap(({ payload: { bar } }: { payload: { bar: IBar } }) => {
            return of(receiveBarSuccess({ symbol: bar.symbol, bar }));
        })
    );

    public findMany$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(findManyBar),
        concatMap(({ payload: { symbol, from, to } }: { payload: { symbol: string, from: Date, to: Date } }) => {
            return this.barService.findMany(symbol, from, to).pipe(
                map(bars => findManyBarSuccess({ symbol: symbol, bars })),
                catchError(error => [
                    findManyBarError(error)
                ])
            );
        })
    );

    public updateConnectionStatus$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(updateConnectionStatusBar),
        switchMap(({ payload: { status } }: { payload: { status: ConnectionStatus } }) => {
            return of(updateConnectionStatusBarSuccess({ status }));
        })
    );

    public updateSubscriptionStatus$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(updateSubscriptionStatusBar),
        switchMap(({ payload: { symbol, status } }: { payload: { symbol: string, status: SubscriptionStatus } }) => {
            return of(updateSubscriptionStatusBarSuccess({ symbol, status }));
        })
    );
}
