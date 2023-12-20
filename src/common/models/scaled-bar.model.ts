import { Bar } from "./bar.model";
import { IScaledBar } from "./iscaled-bar.model";

export class ScaledBar extends Bar implements IScaledBar {
    public scaledClose: number;
    public scaledHigh: number;
    public scaledLow: number;
    public scaledOpen: number;
    public scaledVolume: number;
    public scaledVwap: number;
    public x: number;
    public y: number;

    public constructor(bar: Record<string, string | number | Date | undefined>, xScale: (val: Date) => number, yScale: (val: number) => number) {
        super(bar);
        this.scaledClose = yScale(this.close);
        this.scaledHigh = yScale(this.high);
        this.scaledLow = yScale(this.low);
        this.scaledOpen = yScale(this.open);
        this.scaledVolume = yScale(this.volume);
        this.scaledVwap = yScale(this.vwap);
        this.x = xScale(this.timeUtc);
        this.y = 0; // TODO: unused
    }
}