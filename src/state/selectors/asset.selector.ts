import { createSelector } from "@reduxjs/toolkit";
import { IRootPartition } from "../partitions";
import { IAsset } from "../../common";

const selectAsset = (state: IRootPartition) => state.asset;

export const selectAssetError = createSelector(
    selectAsset,
    (asset) => asset.error
);

export const selectAssets = createSelector(
    selectAsset,
    (asset) => new Map<string, IAsset>(Object.entries(asset.assets))
);

export const selectAssetBySymbol = createSelector(
    selectAssets,
    (_: IRootPartition, symbol: string) => symbol,
    (assets, symbol) => assets.get(symbol) ?? null
);

export const selectLatestQueryResult = createSelector(
    selectAsset,
    (asset) => asset.latestQueryResult
);

