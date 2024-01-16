import { inject, injectable } from "inversify";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { Observable, map } from "rxjs";
import { ICalendarRepository } from "./icalendar.repository";
import { IHttpRepository } from "./ihttp.repository";
import { Calendar, ICalendar, ICalendarFindManyParams } from "../models";

@injectable()
export class CalendarRepository implements ICalendarRepository {
    private readonly url = 'https://localhost:7221/Calendar';

    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;

    public findMany(params: ICalendarFindManyParams): Observable<ICalendar[]> {
        return this.httpRepository.get<ICalendar[]>(`${this.url}/many`, params).pipe(
            map(d => d.data.map(calendar => new Calendar(calendar as unknown as Record<string, string | Date | boolean | undefined>) as ICalendar))
        );
    }
}