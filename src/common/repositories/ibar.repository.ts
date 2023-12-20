import { IBar, IBarFindManyParams } from "../models";
import { Observable } from "rxjs";

export interface IBarRepository {
    connect(): Observable<void>;
    disconnect(): Observable<void>;
    registerAll(registrationMap: Map<string, (...args: any[]) => void>): void;
    invoke<T>(event: string, ...args: any[]): Observable<T>;
    findMany(params: IBarFindManyParams): Observable<IBar[]>;
}