import { Observable } from "rxjs";
import { ICalendar } from "../models";

export interface ICalendarService {
    findMany(from: Date, to: Date): Observable<ICalendar[]>;
}
