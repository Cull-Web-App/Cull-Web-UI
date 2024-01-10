import { IWatch } from "../models";
import { Observable } from "rxjs";

export interface IWatchRepository {
    findAll(): Observable<IWatch[]>;
    createOne(watch: IWatch): Observable<void>;
    createMany(watches: IWatch[]): Observable<void>;
    deleteOne(symbol: string): Observable<void>;
    deleteMany(symbols: string[]): Observable<void>;
    updateMany(symbols: IWatch[]): Observable<IWatch[]>;
}
