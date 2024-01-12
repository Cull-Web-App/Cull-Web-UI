import { inject, injectable } from "inversify";
import { ISignalRRepository } from "./isignalr.repository";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { Observable, map } from "rxjs";
import { IBarRepository } from "./ibar.repository";
import { IHttpRepository } from "./ihttp.repository";
import { Bar, IBar, IBarFindManyParams } from "../models";

@injectable()
export class BarRepository implements IBarRepository {

    private readonly url = 'https://localhost:7221/Bar';

    @inject(IDENTIFIERS.ISIGNALR_REPOSITORY) private readonly signalRRepository!: ISignalRRepository;
    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;

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

    public findMany(params: IBarFindManyParams): Observable<IBar[]> {
        return this.httpRepository.get<IBar[]>(this.url, params).pipe(
            map(d => d.data.map(bar => new Bar(bar as unknown as Record<string, string | number>)))
        );
    }
}