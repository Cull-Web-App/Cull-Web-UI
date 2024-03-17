import { createSelector } from "@reduxjs/toolkit";
import { IRootPartition } from "../partitions";
import { IBar, SubscriptionStatus } from "../../common";

const selectBar = (state: IRootPartition) => state.bar;

export const selectBarError = createSelector(
    selectBar,
    (bar) => bar.error
);

export const selectBarMap = createSelector(
    selectBar,
    (bar) => new Map<string, IBar[]>(Object.entries(bar.barMap))
);

export const selectBarsForSymbol = createSelector(
    selectBarMap,
    (_: IRootPartition, symbol: string) => symbol,
    (barMap, symbol) => barMap.get(symbol) ?? []
);

export const selectBarsForSymbolSorted = createSelector(
    selectBarsForSymbol,
    (bars) => bars.sort((a, b) => new Date(a.timeUtc).getTime() - new Date(b.timeUtc).getTime())
);

export const selectBarsForSymbolInTimeRange = createSelector(
    selectBarsForSymbolSorted,
    (_: IRootPartition, symbol: string, start: string, end: string) => start,
    (_: IRootPartition, symbol: string, start: string, end: string) => end,
    (bars, start, end) => bars.filter((bar) => {
        const time = new Date(bar.timeUtc);
        return time >= new Date(start) && time <= new Date(end);
    })
);

export const selectBarsForSymbolFromTime = createSelector(
    selectBarsForSymbolSorted,
    (_: IRootPartition, symbol: string, start: string) => start,
    (bars, start) => bars.filter((bar) => new Date(bar.timeUtc) >= new Date(start))
);

export const selectSubscribedSymbolsBar = createSelector(
    selectBar,
    (bar) => bar.subscribedSymbols
);

export const selectSubscribersPerSymbolBar = createSelector(
    selectBar,
    (bar) => new Map<string, number>(Object.entries(bar.subscribersPerSymbol))
);

export const selectSubscribersForSymbolBar = createSelector(
    selectSubscribersPerSymbolBar,
    (_: IRootPartition, symbol: string) => symbol,
    (subscribersPerSymbol, symbol) => subscribersPerSymbol.get(symbol) ?? 0
);

export const selectSubscriptionStatusPerSymbolBar = createSelector(
    selectBar,
    (bar) => new Map<string, SubscriptionStatus>(Object.entries(bar.subscriptionStatusPerSymbol))
);

export const selectSubscriptionStatusForSymbolBar = createSelector(
    selectSubscriptionStatusPerSymbolBar,
    (_: IRootPartition, symbol: string) => symbol,
    (subscriptionStatusPerSymbol, symbol) => subscriptionStatusPerSymbol.get(symbol) ?? SubscriptionStatus.Unsubscribed
);

export const selectConnectionStatusBar = createSelector(
    selectBar,
    (bar) => bar.connectionStatus
);
