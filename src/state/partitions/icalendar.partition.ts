import { ICalendar } from "../../common";

export interface ICalendarPartition {
    calendars: ICalendar[];
    error: string | null;
}
