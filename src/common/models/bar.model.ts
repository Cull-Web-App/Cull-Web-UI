export class Bar {
    public channel: string;
    public close: number;
    public high: number;
    public low: number;
    public open: number;
    public symbol: string;
    public timeUtc: string;
    public timestampUtc: string;
    public tradeCount: number;
    public volume: number;
    public vwap: number;

    // TODO: fix any
    public constructor(bar: Record<string, string | number | undefined>) {
        this.channel = bar.channel as string;
        this.close = bar.close as number;
        this.high = bar.high as number;
        this.low = bar.low as number;
        this.open = bar.open as number;
        this.symbol = bar.symbol as string;
        this.timeUtc = bar.timeUtc as string;
        this.timestampUtc = bar.timestampUtc as string;
        this.tradeCount = bar.tradeCount as number;
        this.volume = bar.volume as number;
        this.vwap = bar.vwap as number;
    }
}