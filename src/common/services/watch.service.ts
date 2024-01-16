import { Observable } from 'rxjs';
import { injectable, inject } from 'inversify';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IWatchRepository } from '../repositories';
import { IWatchService } from './iwatch.service';
import { IWatch, Watch } from '../models';

@injectable()
export class WatchService implements IWatchService {

    @inject(IDENTIFIERS.IWATCH_REPOSITORY) private readonly watchRepository!: IWatchRepository;

    public findAll(): Observable<IWatch[]> {
        return this.watchRepository.findAll();
    }

    public createOne(symbol: string, position: number): Observable<void> {
        const watch: IWatch = new Watch({ symbol, position, createdAt: new Date() });
        return this.watchRepository.createOne(watch);
    }

    public createMany(watches: IWatch[]): Observable<void> {
        return this.watchRepository.createMany(watches);
    }

    public deleteOne(symbol: string): Observable<void> {
        return this.watchRepository.deleteOne(symbol);
    }

    public deleteMany(symbols: string[]): Observable<void> {
        return this.watchRepository.deleteMany(symbols);
    }

    public updateMany(watches: IWatch[]): Observable<IWatch[]> {
        return this.watchRepository.updateMany(watches);
    }
}