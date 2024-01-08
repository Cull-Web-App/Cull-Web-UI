import { injectable, inject } from 'inversify';
import { Observable, map } from 'rxjs';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IHttpRepository } from './ihttp.repository';
import { IWatchRepository } from './iwatch.repository';

@injectable()
export class WatchRepository implements IWatchRepository {
    private readonly url = 'https://localhost:7221/WatchList';

    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;

    public findAll(): Observable<string[]> {
        return this.httpRepository.get<string[]>(this.url).pipe(
            map(d => d.data as string[])
        );
    }

    public createOne(symbol: string): Observable<void> {
        return this.httpRepository.post<string>(this.url, { symbol }).pipe(
            map(d => undefined)
        );
    }

    public deleteOne(symbol: string): Observable<void> {
        return this.httpRepository.delete<string>(this.url, { symbol }).pipe(
            map(d => undefined)
        );
    }
}