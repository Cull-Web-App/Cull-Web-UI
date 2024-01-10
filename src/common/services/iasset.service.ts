import { Observable } from 'rxjs';
import { IAsset } from '../models';

export interface IAssetService {
    findMany(queryOrSymbols: string | string[]): Observable<IAsset[]>;
    findOne(symbol: string): Observable<IAsset>;
}