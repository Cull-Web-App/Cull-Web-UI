import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
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
    receiveBarSuccess
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { Bar, IBar, IBarService, container } from '../../common';
import { of } from 'rxjs';

export class BarEpic {
    private readonly barService!: IBarService;

    public constructor() {
        this.barService = container.get<IBarService>(IDENTIFIERS.IBAR_SERVICE);
    }

    public connect$: Epic<any> = (actions$, state$, { store }) => actions$.pipe(
        ofType(barConnect),
        switchMap(() => {
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

    public disconnect$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(barDisconnect),
        switchMap(() => {
            return this.barService.disconnect().pipe(
                map(_ => barDisconnectSuccess()),
                catchError(error => [
                    barDisconnectError(error)
                ])
            );
        })
    );

    public subscribeBar$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(subscribeBar),
        switchMap(({ payload: { symbol }}: { payload: { symbol: string } }) => {
            return this.barService.subscribe(symbol).pipe(
                map(_ => subscribeBarSuccess({ symbol })),
                catchError(error => [
                    subscribeBarError(error)
                ])
            );
        })
    );

    public receiveBar$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(receiveBar),
        switchMap(({ payload: { bar } }: { payload: { bar: any } }) => {
            return of(receiveBarSuccess({ symbol: bar.symbol, bar: new Bar(bar) }));
        })
    );
}
