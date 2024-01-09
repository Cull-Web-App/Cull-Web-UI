import { IWatch } from "../models";
import { Observable } from "rxjs";

export interface IWatchRepository {
    findAll(): Observable<string[]>;
    createOne(watch: IWatch): Observable<void>;
    deleteOne(symbol: string): Observable<void>;
    updateMany(symbols: IWatch[]): Observable<IWatch[]>;
}
