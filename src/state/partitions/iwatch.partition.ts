import { IWatch } from "../../common";

export interface IWatchPartition {
    watches: IWatch[];
    error: string | null;
}