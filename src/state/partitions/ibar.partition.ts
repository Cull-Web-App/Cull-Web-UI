import { ConnectionStatus, IBar, SubscriptionStatus } from "../../common";

export interface IBarPartition {
    subscribedSymbols: string[];
    subscribersPerSymbol: Record<string, number>;
    barMap: Record<string, IBar[]>;
    connectionStatus: ConnectionStatus;
    subscriptionStatusPerSymbol: Record<string, SubscriptionStatus>;
    error: string | null;
}
