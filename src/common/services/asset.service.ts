import { IAssetService } from './iasset.service';
import { Observable, forkJoin } from 'rxjs';
import { injectable, inject } from 'inversify';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IAssetRepository } from '../repositories/iasset.repository';
import { IAsset } from '../models';

@injectable()
export class AssetService implements IAssetService {

    @inject(IDENTIFIERS.IASSET_REPOSITORY) private readonly assetRepository!: IAssetRepository;

    public findMany(queryOrSymbols: string | string[]): Observable<IAsset[]> {
        if (typeof queryOrSymbols === 'string') {
            return this.assetRepository.findMany(queryOrSymbols);
        } else {
            // There is no findMany endpoint for exact symbol match, so we have to make multiple calls
            return forkJoin(queryOrSymbols.map(symbol => this.assetRepository.findOne(symbol)));
        }
    }

    public findOne(symbol: string): Observable<IAsset> {
        return this.assetRepository.findOne(symbol);
    }
}