import { handleActions } from "redux-actions";
import { ICalendarPartition } from "../partitions";
import { findManyCalendarError, findManyCalendarSuccess } from "../actions";

type CalendarState = ICalendarPartition;

const initialState: CalendarState = {
    calendars: [],
    error: null
};

export const calendar = handleActions<CalendarState, string>(
    {
        [findManyCalendarSuccess.toString()]: (state: CalendarState, { payload: { calendars } }: any) => ({
            calendars: calendars,
            error: null
        }),
        [findManyCalendarError.toString()]: (state: CalendarState, action: any) => ({
            ...state,
            error: action.payload
        })
    },
    initialState
);
