export interface IAsset {
    assetId: string;
    class: string;
    exchange: string;
    symbol: string;
    name: string;
    status: string;
    isTradable: boolean;
    marginable: boolean;
    shortable: boolean;
    easyToBorrow: boolean;
    fractionable: boolean;
    minOrderSize?: number;
    minTradeIncrement?: number;
    priceIncrement?: number;
    maintenanceMarginRequirement?: number;
    attributes: string[];
}