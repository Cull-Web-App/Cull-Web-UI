import { Observable } from "rxjs";

export interface IBarService {
    connect(): Observable<void>;
    disconnect(): Observable<void>;
    registerAll(registrationMap: Map<string, (...args: any[]) => void>): void;
    subscribe(symbol: string): Observable<void>;
}
