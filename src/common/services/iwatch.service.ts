import { IWatch } from "../models";
import { Observable } from "rxjs";

export interface IWatchService {
    findAll(): Observable<string[]>;
    createOne(symbol: string, position: number): Observable<void>;
    deleteOne(symbol: string): Observable<void>;
    updateMany(watches: IWatch[]): Observable<IWatch[]>;
}
