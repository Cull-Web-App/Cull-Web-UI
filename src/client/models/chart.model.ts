export interface ChartData{
    openPrice: string,
    closePrice: string,
    date: Date,
    time?: string
}

export interface ChartParams {
    ticker: string,
    interval?:string,
    chartData: ChartData[]
}