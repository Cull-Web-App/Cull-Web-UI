export interface IMarketMakerMove {
    symbol: string;
    timeStamp: Date;
    impliedVolatility: number;
    daysToExpiration: number;
    marketMakerMove: number;
    marketMakerMovePercent: number;
}
