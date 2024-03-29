import { IAssetPartition } from "./iasset.partition";
import { IBarPartition } from "./ibar.partition";
import { ICalendarPartition } from "./icalendar.partition";
import { IMarketMakerMovePartition } from "./imarket-maker-move.partition";
import { IPreferencePartition } from "./ipreference.partition";
import { IUserPartition } from "./iuser.partition";
import { IWatchPartition } from "./iwatch.partition";

export interface IRootPartition {
    asset: IAssetPartition;
    bar: IBarPartition;
    preference: IPreferencePartition;
    watch: IWatchPartition;
    user: IUserPartition;
    calendar: ICalendarPartition;
    marketMakerMove: IMarketMakerMovePartition;
}
    