import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    subscribe,
    subscribeSuccess,
    subscribeError,
    unsubscribe,
    unsubscribeSuccess,
    unsubscribeError,
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { container } from '../../common/ioc/container.ioc';
import { ISubscriptionService } from '../../common';

export const subscribe$: Epic<any> = (actions$, state$) => actions$.pipe(
    ofType(subscribe),
    switchMap(({ payload: symbol }: { payload: string }) => {
        const subscriptionService: ISubscriptionService = container.get<ISubscriptionService>(IDENTIFIERS.ISUBSCRIPTION_SERVICE);
        return subscriptionService.subscribe(symbol).pipe(
            map(_ => subscribeSuccess({ symbol })),
            catchError(error => [
                subscribeError(error)
            ])
        );
    })
);

export const unsubscribe$: Epic<any> = (actions$, state$) => actions$.pipe(
    ofType(unsubscribe),
    switchMap(({ payload: symbol }: { payload: string }) => {
        const subscriptionService: ISubscriptionService = container.get<ISubscriptionService>(IDENTIFIERS.ISUBSCRIPTION_SERVICE);
        return subscriptionService.unsubscribe(symbol).pipe(
            map(_ => unsubscribeSuccess({ symbol })),
            catchError(error => [
                unsubscribeError(error)
            ])
        );
    })
);