import { inject, injectable } from "inversify";
import { ISignalRRepository } from "./isignalr.repository";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { Observable } from "rxjs";
import { IBarRepository } from "./ibar.repository";

@injectable()
export class BarRepository implements IBarRepository {

    private readonly url = 'https://localhost:7221/Bar';

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

    public invoke<T>(event: string, ...args: any[]): Observable<T> {
        return this.signalRRepository.invoke(event, ...args);
    }
}