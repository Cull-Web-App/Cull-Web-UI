import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { ISubscriptionRepository } from "../repositories";
import { ISubscriptionService } from "./isubscription.service";

@injectable()
export class SubscriptionService implements ISubscriptionService {
    @inject(IDENTIFIERS.ISUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository!: ISubscriptionRepository;
    
    public subscribe(symbol: string): Observable<void> {
        return this.subscriptionRepository.subscribe(symbol);
    }

    public unsubscribe(symbol: string): Observable<void> {
        return this.subscriptionRepository.unsubscribe(symbol);
    }
}