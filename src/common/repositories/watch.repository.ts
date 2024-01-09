import { injectable, inject } from 'inversify';
import { Observable, map } from 'rxjs';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IHttpRepository } from './ihttp.repository';
import { IWatchRepository } from './iwatch.repository';
import { IWatch, Watch } from '../models';

@injectable()
export class WatchRepository implements IWatchRepository {
    private readonly url = 'https://localhost:7221/WatchList';

    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;

    public findAll(): Observable<string[]> {
        return this.httpRepository.get<string[]>(this.url).pipe(
            map(d => d.data as string[])
        );
    }

    public createOne(watch: IWatch): Observable<void> {
        return this.httpRepository.post<string>(this.url, watch).pipe(
            map(d => undefined)
        );
    }

    public deleteOne(symbol: string): Observable<void> {
        return this.httpRepository.delete<string>(this.url, { symbol }).pipe(
            map(d => undefined)
        );
    }

    public updateMany(symbols: IWatch[]): Observable<IWatch[]> {
        return this.httpRepository.put<IWatch[]>(this.url, symbols).pipe(
            map(d => d.data.map(watch => new Watch(watch as unknown as Record<string, string>)))
        );
    }
}