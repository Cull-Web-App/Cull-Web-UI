export interface ChartData{
    open: number,
    close: number,
    dateTime: Date,
    high: number,
    low: number,
    volume: number,
    change: number,
    changePercent: number
}

export interface ChartParams {
    ticker: string,
    interval: string,
    startDate: Date,
    stopDate: Date,
    chartData: ChartData[]
}