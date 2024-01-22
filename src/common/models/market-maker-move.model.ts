import { IMarketMakerMove } from "./imarket-maker-move.model";

export class MarketMakerMove implements IMarketMakerMove {
    public symbol: string;
    public timeStamp: Date;
    public impliedVolatility: number;
    public daysToExpiration: number;
    public marketMakerMove: number;
    public marketMakerMovePercent: number;

    public constructor(move: Record<string, string | number | Date>) {
        this.symbol = move.symbol as string;
        this.impliedVolatility = move.impliedVolatility as number;
        this.daysToExpiration = move.daysToExpiration as number;
        this.marketMakerMove = move.marketMakerMove as number;
        this.marketMakerMovePercent = move.marketMakerMovePercent as number;

        if (move.timeStamp instanceof Date) {
            this.timeStamp = move.timeStamp;
        } else {
            this.timeStamp = new Date(move.timeStamp as string);
        }
    }
}