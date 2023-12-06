import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { IBarRepository } from "../repositories";
import { IBarService } from "./ibar.service";

@injectable()
export class BarService implements IBarService {
    @inject(IDENTIFIERS.IBAR_REPOSITORY) private readonly barRepository!: IBarRepository;
    
    public connect(): Observable<void> {
        return this.barRepository.connect();
    }

    public disconnect(): Observable<void> {
        return this.barRepository.disconnect();
    }

    public registerAll(registrationMap: Map<string, (...args: any[]) => void>): void {
        this.barRepository.registerAll(new Map<string, (...args: any[]) => void>([
            ['ReceiveBar', (bar) => registrationMap.get('ReceiveBar')!(bar)]
        ]));
    }

    public subscribe(symbol: string): Observable<void> {
        return this.barRepository.invoke('Subscribe', symbol);
    }
}