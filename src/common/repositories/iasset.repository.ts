import { Observable } from 'rxjs';
import { IAsset } from '../models';

export interface IAssetRepository {
    findMany(query: string): Observable<IAsset[]>;
    findOne(symbol: string): Observable<IAsset>;
}