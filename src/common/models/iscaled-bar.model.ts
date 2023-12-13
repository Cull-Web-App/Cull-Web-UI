import { IBar } from "./ibar.model";

export interface IScaledBar extends IBar {
    scaledClose: number;
    scaledHigh: number;
    scaledLow: number;
    scaledOpen: number;
    scaledVolume: number;
    scaledVwap: number;
    x: number;
    y: number;
}
