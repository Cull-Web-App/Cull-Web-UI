import { Observable } from "rxjs";

export interface IWatchService {
    findAll(): Observable<string[]>;
    createOne(symbol: string): Observable<string>;
    deleteOne(symbol: string): Observable<string>;
}
