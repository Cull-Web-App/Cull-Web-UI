import { ofType, Epic } from 'redux-observable';
import { map, catchError, concatMap, switchMap, } from 'rxjs/operators';
import {
    findManyCalendar,
    findManyCalendarError,
    findManyCalendarSuccess
} from '../actions';
import { IDENTIFIERS } from '../../common/ioc/identifiers.ioc';
import {  ICalendarService, container } from '../../common';
import { BaseEpic } from './base.epic';

export class CalendarEpic extends BaseEpic {
    private readonly calendarService!: ICalendarService;

    public constructor() {
        super();
        this.calendarService = container.get<ICalendarService>(IDENTIFIERS.ICALENDAR_SERVICE);
        this.addEpics([
            this.findMany$
        ]);
    }

    public findMany$: Epic<any> = (actions$, state$) => actions$.pipe(
        ofType(findManyCalendar),
        switchMap(({ payload: { from, to } }: { payload: { from: Date, to: Date } }) => {
            return this.calendarService.findMany(from, to).pipe(
                map(calendars => findManyCalendarSuccess({ calendars })),
                catchError(error => [
                    findManyCalendarError(error)
                ])
            );
        })
    );
}
