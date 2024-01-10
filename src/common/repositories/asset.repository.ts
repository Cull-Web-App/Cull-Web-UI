import { IAssetRepository } from './iasset.repository';
import { injectable, inject } from 'inversify';
import { Observable, map } from 'rxjs';
import { IDENTIFIERS } from '../ioc/identifiers.ioc';
import { IHttpRepository } from './ihttp.repository';
import { Asset, IAsset } from '../models';

@injectable()
export class AssetRepository implements IAssetRepository {
    private readonly url = 'https://localhost:7221/Asset';

    @inject(IDENTIFIERS.IHTTP_REPOSITORY) private readonly httpRepository!: IHttpRepository;

    public findMany(query: string): Observable<IAsset[]> {
        return this.httpRepository.get<IAsset[]>(this.url, { queryFilter: query }).pipe(
            map(d => d.data.map(item => new Asset(item as unknown as Record<string, string | boolean | string[] | number>)) as IAsset[])
        );
    }
}