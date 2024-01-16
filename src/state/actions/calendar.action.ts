import { ICalendar } from "../../common";
import { createActions } from "redux-actions"

export const {
    findManyCalendar,
    findManyCalendarSuccess,
    findManyCalendarError
} = createActions({
    FIND_MANY_CALENDAR: ({ from, to }: { from: Date, to: Date }) => ({ from, to }),
    FIND_MANY_CALENDAR_SUCCESS: ({ calendars }: { calendars: ICalendar[] }) => ({ calendars }),
    FIND_MANY_CALENDAR_ERROR: (error: string) => error
});
