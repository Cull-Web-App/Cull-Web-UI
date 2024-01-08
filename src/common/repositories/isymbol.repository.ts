import { Observable } from 'rxjs';
import { IAsset } from '../models';
export interface ISymbolRepository {
    findMany(query: string): Observable<IAsset[]>;
}