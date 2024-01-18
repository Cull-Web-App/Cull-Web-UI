import { ofType, Epic } from 'redux-observable';
import { map, catchError, switchMap } from 'rxjs/operators';
import {
    initializePreferences,
    initializePreferencesSuccess,
    initializePreferencesError,
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import { container } from '../../common/ioc/container.ioc';
import { BaseEpic } from './base.epic';
import { IPreference } from '../../common';

export class PreferenceEpic extends BaseEpic {
    private readonly preferenceService!: any;
    public constructor() {
        super();
        this.preferenceService = container.get<any>(IDENTIFIERS.IPREFERENCE_SERVICE);
        this.addEpics([this.initialize$]);
    }

    public initialize$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(initializePreferences),
        switchMap(() => {
            return this.preferenceService.findAll().pipe(
                map((preference: IPreference) => initializePreferencesSuccess({ darkMode: preference.darkMode })),
                catchError(error => [
                    initializePreferencesError(error)
                ])
            );
        })
    );
}
