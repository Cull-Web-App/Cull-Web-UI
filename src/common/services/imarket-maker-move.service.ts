import { Observable } from "rxjs";

export interface IMarketMakerMoveService {
    connect(): Observable<void>;
    disconnect(): Observable<void>;
    registerAll(registrationMap: Map<string, (...args: any[]) => void>): void;
    deregisterAll(registrationMap: Map<string, (...args: any[]) => void>): void;
    subscribe(symbol: string): Observable<void>;
    unsubscribe(symbol: string): Observable<void>;
}
