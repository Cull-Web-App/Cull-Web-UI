// Create an enum for TimeSetting that describes Period of time (dimension of candlestick) i.e. 1Day:1m would be 1 day candles with 1 minute granularity
export const enum TimeSetting {
    OneDayByOneMinute = "1Day:1m",
    OneDayByFiveMinutes = "1Day:5m",
    FiveDaysByFiveMinutes = "5Day:5m",
    FiveDaysByFifteenMinutes = "5Day:15m",
    TenDaysByThirtyMinutes = "10Day:30m",
    TwentyDaysByOneHour = "20Day:1h",
    SixMonthsByFourHours = "6Month:4h",
    OneYearByOneDay = "1Year:1d",
    FiveYearsByOneWeek = "5Year:1w",
    TenYearsByOneMonth = "10Year:1M",
    FifteenYearsByOneMonth = "15Year:1M",
    TwentyYearsByOneMonth = "20Year:1M"
}
