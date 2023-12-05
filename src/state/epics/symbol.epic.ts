import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    initializeSymbols,
    initializeSymbolsSuccess,
    initializeSymbolsError,
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { ISymbolService } from '../../common/services/isymbol.service';
import { container } from '../../common/ioc/container.ioc';

export const initializeSymbols$: Epic<any> = (actions$, state$) => actions$.pipe(
    ofType(initializeSymbols),
    switchMap(() => {
        const symbolService: ISymbolService = container.get<ISymbolService>(IDENTIFIERS.ISYMBOL_SERVICE);
        return symbolService.findAll().pipe(
            map(symbols => initializeSymbolsSuccess({ symbols })),
            catchError(error => [
                initializeSymbolsError(error)
            ])
        );
    })
);