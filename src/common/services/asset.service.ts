import { IAssetService } from './iasset.service';
import { Observable } from 'rxjs';
import { injectable, inject } from 'inversify';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IAssetRepository } from '../repositories/iasset.repository';
import { IAsset } from '../models';

@injectable()
export class AssetService implements IAssetService {

    @inject(IDENTIFIERS.IASSET_REPOSITORY) private readonly assetRepository!: IAssetRepository;

    public findMany(query: string): Observable<IAsset[]> {
        return this.assetRepository.findMany(query);
    }
}