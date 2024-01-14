import { IAssetPartition } from "./iasset.partition";
import { IBarPartition } from "./ibar.partition";
import { IPreferencePartition } from "./ipreference.partition";
import { IUserPartition } from "./iuser.partition";
import { IWatchPartition } from "./iwatch.partition";

export interface IRootPartition {
    asset: IAssetPartition;
    bar: IBarPartition;
    preference: IPreferencePartition;
    watch: IWatchPartition;
    user: IUserPartition;
}
    