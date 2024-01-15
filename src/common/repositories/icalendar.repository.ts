import { ICalendarFindManyParams, ICalendar } from "../models";
import { Observable } from "rxjs";

export interface ICalendarRepository {
    findMany(params: ICalendarFindManyParams): Observable<ICalendar[]>;
}