import { Observable } from "rxjs";

export interface ISubscriptionService {
    subscribe(symbol: string): Observable<void>;
    unsubscribe(symbol: string): Observable<void>;
}