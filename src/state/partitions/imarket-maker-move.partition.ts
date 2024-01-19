import { ConnectionStatus, IMarketMakerMove, SubscriptionStatus } from "../../common";

export interface IMarketMakerMovePartition {
    marketMakerMoves: Record<string, IMarketMakerMove[]>;
    error: string | null;
    connectionStatus: ConnectionStatus;
    subscriptionStatusPerSymbol: Record<string, SubscriptionStatus>;
}
