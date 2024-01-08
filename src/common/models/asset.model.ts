import { IAsset } from './iasset.model';

export class Asset implements IAsset {
    public assetId: string;
    public class: string;
    public exchange: string;
    public symbol: string;
    public name: string;
    public status: string;
    public isTradable: boolean;
    public marginable: boolean;
    public shortable: boolean;
    public easyToBorrow: boolean;
    public fractionable: boolean;
    public minOrderSize?: number;
    public minTradeIncrement?: number;
    public priceIncrement?: number;
    public maintenanceMarginRequirement?: number;
    public attributes: string[];

    public constructor(
        asset: Record<string, string | number | Date | boolean | string[] | undefined>
    ) {
        this.assetId = asset.assetId as string;
        this.class = asset.class as string;
        this.exchange = asset.exchange as string;
        this.symbol = asset.symbol as string;
        this.name = asset.name as string;
        this.status = asset.status as string;
        this.isTradable = asset.isTradable as boolean;
        this.marginable = asset.marginable as boolean;
        this.shortable = asset.shortable as boolean;
        this.easyToBorrow = asset.easyToBorrow as boolean;
        this.fractionable = asset.fractionable as boolean;
        this.minOrderSize = asset.minOrderSize as number;
        this.minTradeIncrement = asset.minTradeIncrement as number;
        this.priceIncrement = asset.priceIncrement as number;
        this.maintenanceMarginRequirement = asset.maintenanceMarginRequirement as number;
        this.attributes = asset.attributes as string[];
    }
}
