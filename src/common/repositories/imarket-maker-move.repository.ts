import { Observable } from "rxjs";

export interface IMarketMakerMoveRepository {
    connect(): Observable<void>;
    disconnect(): Observable<void>;
    registerAll(registrationMap: Map<string, (...args: any[]) => void>): void;
    deregisterAll(registrationMap: Map<string, (...args: any[]) => void>): void;
    invoke<T>(event: string, ...args: any[]): Observable<T>;
}