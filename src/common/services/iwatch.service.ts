import { Observable } from "rxjs";

export interface IWatchService {
    findAll(): Observable<string[]>;
    createOne(symbol: string): Observable<void>;
    deleteOne(symbol: string): Observable<void>;
}
