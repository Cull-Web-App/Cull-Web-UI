import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import {
    mmmConnectSuccess,
    mmmConnectError,
    mmmConnect,
    mmmDisconnectSuccess,
    mmmDisconnectError,
    mmmDisconnect,
    mmmSubscribe,
    mmmSubscribeSuccess,
    mmmSubscribeError,
    mmmUnsubscribe,
    mmmUpdateSubscriptionStatus,
    mmmUnsubscribeSuccess,
    mmmUnsubscribeError,
    mmmReceiveSuccess,
    mmmReceive,
    mmmUpdateConnectionStatus,
    mmmUpdateConnectionStatusSuccess,
    mmmUpdateSubscriptionStatusSuccess
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { ConnectionStatus, IMarketMakerMove, IMarketMakerMoveService, SubscriptionStatus, container } from '../../common';
import { EMPTY, of } from 'rxjs';
import { BaseEpic } from './base.epic';
import { selectConnectionStatusMMM, selectSubscriptionStatusPerSymbolMMM } from '../selectors';

export class MarketMakerMoveEpic extends BaseEpic {
    private readonly marketMakerMoveService!: IMarketMakerMoveService;

    public constructor() {
        super();
        this.marketMakerMoveService = container.get<IMarketMakerMoveService>(IDENTIFIERS.IMARKET_MAKER_MOVE_SERVICE);
        this.addEpics([
            this.connect$,
            this.disconnect$,
            this.subscribeMMM$,
            this.receiveMMM$,
            this.unsubscribeMMM$,
            this.updateConnectionStatus$,
            this.updateSubscriptionStatus$
        ]);
    }

    public connect$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(mmmConnect),
        withLatestFrom(
            state$.pipe(map(state => selectConnectionStatusMMM(state)))
        ),
        concatMap(([_, connectionStatus]: [unknown, ConnectionStatus]) => {
            if (connectionStatus === ConnectionStatus.Connecting) {
                return EMPTY;
            } else if (connectionStatus === ConnectionStatus.Connected) {
                return of(mmmConnectSuccess());
            }

            store.dispatch(mmmUpdateConnectionStatus({ status: ConnectionStatus.Connecting }));
            return this.marketMakerMoveService.connect().pipe(
                map(_ => {
                    this.marketMakerMoveService.registerAll(new Map<string, (...args: any[]) => void>([
                        ['ReceiveMarketMakerMove', (move: IMarketMakerMove) => store.dispatch(mmmReceive({ mmm: move }))]
                    ]));
                    return mmmConnectSuccess()
                }),
                catchError(error => [
                    mmmConnectError(error)
                ])
            );
        })
    );

    public disconnect$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(mmmDisconnect),
        withLatestFrom(
            state$.pipe(map(state => selectConnectionStatusMMM(state)))
        ),
        concatMap(([_, connectionStatus]: [unknown, ConnectionStatus]) => {
            if (connectionStatus === ConnectionStatus.Disconnecting) {
                return EMPTY;
            } else if (connectionStatus === ConnectionStatus.Disconnected) {
                return of(mmmDisconnectSuccess());
            }

            store.dispatch(mmmUpdateConnectionStatus({ status: ConnectionStatus.Disconnecting }));
            return this.marketMakerMoveService.disconnect().pipe(
                map(_ => {
                    this.marketMakerMoveService.deregisterAll(new Map<string, (...args: any[]) => void>([
                        ['ReceiveMarketMakerMove', () => EMPTY]
                    ]));
                }),
                catchError(error => [
                    mmmDisconnectError(error)
                ])
            );
        })
    );

    public subscribeMMM$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(mmmSubscribe),
        withLatestFrom(
            state$.pipe(
                map(state => selectSubscriptionStatusPerSymbolMMM(state))
            )
        ),
        concatMap(([{ payload: { symbol } }, subscriptionStatus]: [{ payload: { symbol: string } }, Map<string, SubscriptionStatus>]) => {
            const currentSubscriptionStatus = subscriptionStatus.get(symbol) ?? SubscriptionStatus.Unsubscribed;
            if (currentSubscriptionStatus === SubscriptionStatus.Subscribed || currentSubscriptionStatus === SubscriptionStatus.Subscribing) {
                return EMPTY;
            }

            store.dispatch(mmmUpdateSubscriptionStatus({ symbol, status: SubscriptionStatus.Subscribing }));
            return this.marketMakerMoveService.subscribe(symbol).pipe(
                map(_ => mmmSubscribeSuccess({ symbol })),
                catchError(error => [
                    mmmSubscribeError(error)
                ])
            );
        })
    );

    public unsubscribeMMM$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(mmmUnsubscribe),
        withLatestFrom(
            state$.pipe(
                map(state => selectSubscriptionStatusPerSymbolMMM(state))
            )
        ),
        concatMap(([{ payload: { symbol } }, subscriptionStatus]: [{ payload: { symbol: string } }, Map<string, SubscriptionStatus>]) => {
            const currentSubscriptionStatus = subscriptionStatus.get(symbol) ?? SubscriptionStatus.Unsubscribed;
            if (currentSubscriptionStatus === SubscriptionStatus.Unsubscribed || currentSubscriptionStatus === SubscriptionStatus.Unsubscribing) {
                return EMPTY;
            }

            // Need to update the subscription status here -- this is because the subscribe method can take time
            // and we don't want to send multiple subscribe requests when one is already in progress
            store.dispatch(mmmUpdateSubscriptionStatus({ symbol, status: SubscriptionStatus.Unsubscribing }));
            return this.marketMakerMoveService.unsubscribe(symbol).pipe(
                map(_ => mmmUnsubscribeSuccess({ symbol })),
                catchError(error => [
                    mmmUnsubscribeError(error)
                ])
            );
        })
    );

    public receiveMMM$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(mmmReceive),
        concatMap(({ payload: { mmm } }: { payload: { mmm: IMarketMakerMove } }) => {
            return of(mmmReceiveSuccess({ symbol: mmm.symbol, mmm }));
        })
    );

    public updateConnectionStatus$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(mmmUpdateConnectionStatus),
        switchMap(({ payload: { status } }: { payload: { status: ConnectionStatus } }) => {
            return of(mmmUpdateConnectionStatusSuccess({ status }));
        })
    );

    public updateSubscriptionStatus$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(mmmUpdateSubscriptionStatus),
        switchMap(({ payload: { symbol, status } }: { payload: { symbol: string, status: SubscriptionStatus } }) => {
            return of(mmmUpdateSubscriptionStatusSuccess({ symbol, status }));
        })
    );
}
