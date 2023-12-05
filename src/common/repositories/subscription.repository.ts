import { inject, injectable } from 'inversify';
import { map, Observable } from "rxjs";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { IHttpRepository } from "./ihttp.repository";
import { ISubscriptionRepository } from "./isubscription.repository";

@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {

    private readonly url = 'http://localhost:8080'

    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;

    public subscribe(symbol: string): Observable<void> {
        const clientId: string = sessionStorage.getItem('clientId') as string;
        return this.httpRepository.post<void>(`${this.url}/subscribe/${symbol}`, { clientId }).pipe(
            map(d => { return; })
        );
    }

    public unsubscribe(symbol: string): Observable<void> {
        const clientId: string = sessionStorage.getItem('clientId') as string;
        return this.httpRepository.post<void>(`${this.url}/unsubscribe/${symbol}`, { clientId }).pipe(
            map(d => { return; })
        );
    }
}