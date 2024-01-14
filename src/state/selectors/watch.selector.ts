import { createSelector } from "@reduxjs/toolkit";
import { IRootPartition } from "../partitions";

const watchSelector = (state: IRootPartition) => state.watch;

export const selectWatchError = createSelector(
    watchSelector,
    (watch) => watch.error
);

export const selectWatches = createSelector(
    watchSelector,
    (watch) => watch.watches
);
