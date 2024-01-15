import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { ICalendarRepository } from "../repositories";
import { ICalendarService } from "./icalendar.service";
import { ICalendar, ICalendarFindManyParams } from "../models";

@injectable()
export class CalendarService implements ICalendarService {
    @inject(IDENTIFIERS.ICALENDAR_REPOSITORY) private readonly calendarRepository!: ICalendarRepository;

    public findMany(from: Date, to: Date): Observable<ICalendar[]> {
        const params: ICalendarFindManyParams = {
            from: from,
            to: to,
        };
        return this.calendarRepository.findMany(params);
    }
}