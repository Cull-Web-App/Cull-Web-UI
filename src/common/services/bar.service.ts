import { inject, injectable } from "inversify";
import { Observable } from "rxjs";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { IBarRepository } from "../repositories";
import { IBarService } from "./ibar.service";
import { Bar, IBar, IBarFindManyParams } from "../models";

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
            ['ReceiveBar', (bar: Record<string, string | number | Date | undefined>) => registrationMap.get('ReceiveBar')!(new Bar(bar))]
        ]));
    }

    public subscribe(symbol: string): Observable<void> {
        return this.barRepository.invoke('Subscribe', symbol);
    }

    public unsubscribe(symbol: string): Observable<void> {
        return this.barRepository.invoke('Unsubscribe', symbol);
    }

    public findMany(symbol: string, from: Date, to: Date): Observable<IBar[]> {
        const params: IBarFindManyParams = {
            symbol: symbol,
            from: from,
            to: to,
            interval: 1 // move this to enum
        };
        return this.barRepository.findMany(params);
    }
}