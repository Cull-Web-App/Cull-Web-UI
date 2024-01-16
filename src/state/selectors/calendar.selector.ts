import { createSelector } from "@reduxjs/toolkit";
import { IRootPartition } from "../partitions";

const calendarSelector = (state: IRootPartition) => state.calendar;

export const selectCalendars = createSelector(
    calendarSelector,
    (calendar) => calendar.calendars
);

export const selectCalendarError = createSelector(
    calendarSelector,
    (calendar) => calendar.error
);
