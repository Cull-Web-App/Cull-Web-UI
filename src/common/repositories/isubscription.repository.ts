import { Observable } from "rxjs";

export interface ISubscriptionRepository {
    subscribe(symbol: string): Observable<void>;
    unsubscribe(symbol: string): Observable<void>;
}
