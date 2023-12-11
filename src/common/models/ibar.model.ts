export interface IBar {
    channel: string;
    close: number;
    high: number;
    low: number;
    open: number;
    symbol: string;
    timeUtc: Date;
    tradeCount: number;
    volume: number;
    vwap: number;
}