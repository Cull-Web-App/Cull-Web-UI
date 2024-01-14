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
    updateConnectionStatus,
    updateConnectionStatusSuccess,
    updateSubscriptionStatusSuccess,
    updateSubscriptionStatus
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

    public subscribeBar$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(subscribeBar),
        concatMap(({ payload: { symbol } }: { payload: { symbol: string } }) => state$.pipe(
            map(state => (state.bar.subscriptionStatusPerSymbol.get(symbol) ?? SubscriptionStatus.Unsubscribed)),
            filter((subscriptionStatus: SubscriptionStatus) => subscriptionStatus !== SubscriptionStatus.Subscribing),
            withLatestFrom(
                state$.pipe(map(state => state.bar.subscribersPerSymbol)),
            ),
            map(([subscriptionStatus, subscribersPerSymbol]: [string, Map<string, number>]) => [
                symbol,
                (subscribersPerSymbol.get(symbol) ?? 0),
                subscriptionStatus
            ] as [string, number, SubscriptionStatus]),
            take(1)
        )),
        concatMap(([symbol, subscribers, subscriptionStatus]: [string, number, SubscriptionStatus]) => {
            if (subscribers > 0 && subscriptionStatus === SubscriptionStatus.Subscribed) {
                return of(subscribeBarSuccess({ symbol }));
            }

            // Need to update the subscription status here -- this is because the subscribe method can take time
            // and we don't want to send multiple subscribe requests when one is already in progress
            store.dispatch(updateSubscriptionStatus({ symbol, status: SubscriptionStatus.Subscribing }));
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
        concatMap(({ payload: { symbol } }: { payload: { symbol: string } }) => state$.pipe(
            map(state => (state.bar.subscriptionStatusPerSymbol.get(symbol) ?? SubscriptionStatus.Unsubscribed)),
            filter((subscriptionStatus: SubscriptionStatus) => subscriptionStatus !== SubscriptionStatus.Unsubscribing),
            withLatestFrom(
                state$.pipe(map(state => state.bar.subscribersPerSymbol)),
            ),
            map(([subscriptionStatus, subscribersPerSymbol]: [string, Map<string, number>]) => [
                symbol,
                (subscribersPerSymbol.get(symbol) ?? 0),
                subscriptionStatus
            ] as [string, number, SubscriptionStatus]),
            take(1)
        )),
        concatMap(([symbol, subscribers, subscriptionStatus]: [string, number, SubscriptionStatus]) => {
            if (subscribers === 0 && subscriptionStatus === SubscriptionStatus.Unsubscribed) {
                return of(unsubscribeBarSuccess({ symbol }));
            }

            // Need to update the subscription status here -- this is because the subscribe method can take time
            // and we don't want to send multiple subscribe requests when one is already in progress
            store.dispatch(updateSubscriptionStatus({ symbol, status: SubscriptionStatus.Unsubscribing }));
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

    public updateSubscriptionStatus$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(updateSubscriptionStatus),
        switchMap(({ payload: { symbol, status } }: { payload: { symbol: string, status: SubscriptionStatus } }) => {
            return of(updateSubscriptionStatusSuccess({ symbol, status }));
        })
    );
}
