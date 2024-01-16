import { IAsset } from "../../common";

export interface IAssetPartition {
    assets: Record<string, IAsset>;
    latestQueryResult: IAsset[];
    error: string | null;
}
