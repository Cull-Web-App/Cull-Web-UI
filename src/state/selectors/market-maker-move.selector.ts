import { createSelector } from "@reduxjs/toolkit";
import { IMarketMakerMove, SubscriptionStatus } from "../../common";
import { IRootPartition } from "../partitions";

const selectMMM = (state: IRootPartition) => state.marketMakerMove;

export const selectMarketMakerMoveError = createSelector(
    selectMMM,
    (mmm) => mmm.error
);

export const selectMarketMakerMoves = createSelector(
    selectMMM,
    (mmm) => mmm.marketMakerMoves
);

export const selectMarketMakerMovesMap = createSelector(
    selectMarketMakerMoves,
    (marketMakerMoves) => new Map<string, IMarketMakerMove[]>(Object.entries(marketMakerMoves))
);

export const selectMarketMakerMovesForSymbol = createSelector(
    selectMarketMakerMovesMap,
    (_: IRootPartition, symbol: string) => symbol,
    (marketMakerMovesMap, symbol) => marketMakerMovesMap.get(symbol) ?? []
);

export const selectConnectionStatusMMM = createSelector(
    selectMMM,
    (mmm) => mmm.connectionStatus
);

export const selectSubscriptionStatusPerSymbolMMM = createSelector(
    selectMMM,
    (mmm) => new Map<string, SubscriptionStatus>(Object.entries(mmm.subscriptionStatusPerSymbol))
);

export const selectSubscriptionStatusForSymbolMMM = createSelector(
    selectSubscriptionStatusPerSymbolMMM,
    (_: IRootPartition, symbol: string) => symbol,
    (subscriptionStatusPerSymbol, symbol) => subscriptionStatusPerSymbol.get(symbol) ?? SubscriptionStatus.Unsubscribed
);