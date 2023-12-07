import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    initializeSymbols,
    initializeSymbolsSuccess,
    initializeSymbolsError,
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { container } from '../../common/ioc/container.ioc';
import { ISymbolService } from '../../common';
import { BaseEpic } from './base.epic';

export class SymbolEpic extends BaseEpic {
    private readonly symbolService!: ISymbolService;

    public constructor() {
        super();
        this.symbolService = container.get<ISymbolService>(IDENTIFIERS.ISYMBOL_SERVICE);
        this.addEpics([this.initializeSymbols$]);
    }

    public initializeSymbols$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(initializeSymbols),
        switchMap(() => {
            return this.symbolService.findAll().pipe(
                map(symbols => initializeSymbolsSuccess({ symbols })),
                catchError(error => [
                    initializeSymbolsError(error)
                ])
            );
        })
    );
}
