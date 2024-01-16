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

export const selectSubscribedSymbols = createSelector(
    selectBar,
    (bar) => bar.subscribedSymbols
);

export const selectSubscribersPerSymbol = createSelector(
    selectBar,
    (bar) => new Map<string, number>(Object.entries(bar.subscribersPerSymbol))
);

export const selectSubscribersForSymbol = createSelector(
    selectSubscribersPerSymbol,
    (_: IRootPartition, symbol: string) => symbol,
    (subscribersPerSymbol, symbol) => subscribersPerSymbol.get(symbol) ?? 0
);

export const selectSubscriptionStatusPerSymbol = createSelector(
    selectBar,
    (bar) => new Map<string, SubscriptionStatus>(Object.entries(bar.subscriptionStatusPerSymbol))
);

export const selectSubscriptionStatusForSymbol = createSelector(
    selectSubscriptionStatusPerSymbol,
    (_: IRootPartition, symbol: string) => symbol,
    (subscriptionStatusPerSymbol, symbol) => subscriptionStatusPerSymbol.get(symbol) ?? SubscriptionStatus.Unsubscribed
);

export const selectConnectionStatus = createSelector(
    selectBar,
    (bar) => bar.connectionStatus
);
