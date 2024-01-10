import { Observable } from 'rxjs';
import { IAsset } from '../models';

export interface IAssetService {
    findMany(query: string): Observable<IAsset[]>;
}