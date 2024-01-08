import { Observable } from 'rxjs';
import { injectable, inject } from 'inversify';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IWatchRepository } from '../repositories';
import { IWatchService } from './iwatch.service';

@injectable()
export class WatchService implements IWatchService {

    @inject(IDENTIFIERS.IWATCH_REPOSITORY) private readonly watchRepository!: IWatchRepository;

    public findAll(): Observable<string[]> {
        return this.watchRepository.findAll();
    }

    public createOne(symbol: string): Observable<void> {
        return this.watchRepository.createOne(symbol);
    }

    public deleteOne(symbol: string): Observable<void> {
        return this.watchRepository.deleteOne(symbol);
    }
}