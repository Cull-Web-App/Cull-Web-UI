import { Observable } from "rxjs";
import { IBar } from "../models";

export interface IBarService {
    connect(): Observable<void>;
    disconnect(): Observable<void>;
    registerAll(registrationMap: Map<string, (...args: any[]) => void>): void;
    deregisterAll(registrationMap: Map<string, (...args: any[]) => void>): void;
    subscribe(symbol: string): Observable<void>;
    unsubscribe(symbol: string): Observable<void>;
    findMany(symbol: string, from: Date, to: Date): Observable<IBar[]>;
}
