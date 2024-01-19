import { inject, injectable } from "inversify";
import { ISignalRRepository } from "./isignalr.repository";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { Observable } from "rxjs";
import { IMarketMakerMoveRepository } from "./imarket-maker-move.repository";

@injectable()
export class MarketMakerMoveRepository implements IMarketMakerMoveRepository {

    private readonly url = 'https://localhost:7221/MarketMakerMove';

    @inject(IDENTIFIERS.ISIGNALR_REPOSITORY) private readonly signalRRepository!: ISignalRRepository;

    public connect(): Observable<void> {
        return this.signalRRepository.connect(this.url);
    }

    public disconnect(): Observable<void> {
        return this.signalRRepository.disconnect();
    }

    public registerAll(registrationMap: Map<string, (...args: any[]) => void>): void {
        this.signalRRepository.registerAll(registrationMap);
    }

    public deregisterAll(registrationMap: Map<string, (...args: any[]) => void>): void {
        this.signalRRepository.deregisterAll(registrationMap);
    }

    public invoke<T>(event: string, ...args: any[]): Observable<T> {
        return this.signalRRepository.invoke(event, ...args);
    }
}