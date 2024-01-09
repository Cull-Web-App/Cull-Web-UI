import { Observable } from 'rxjs';
import { injectable, inject } from 'inversify';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IWatchRepository } from '../repositories';
import { IWatchService } from './iwatch.service';
import { IWatch, Watch } from '../models';

@injectable()
export class WatchService implements IWatchService {

    @inject(IDENTIFIERS.IWATCH_REPOSITORY) private readonly watchRepository!: IWatchRepository;

    public findAll(): Observable<string[]> {
        return this.watchRepository.findAll();
    }

    public createOne(symbol: string, position: number): Observable<void> {
        const watch: IWatch = new Watch({ symbol, position, createdAt: new Date() });
        return this.watchRepository.createOne(watch);
    }

    public deleteOne(symbol: string): Observable<void> {
        return this.watchRepository.deleteOne(symbol);
    }

    public updateMany(watches: IWatch[]): Observable<IWatch[]> {
        return this.watchRepository.updateMany(watches);
    }
}