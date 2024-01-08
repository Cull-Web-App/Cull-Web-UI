import { IWatch } from "../models";
import { Observable } from "rxjs";

export interface IWatchRepository {
    findAll(): Observable<string[]>;
    createOne(symbol: string): Observable<void>;
    deleteOne(symbol: string): Observable<void>;
}
