import { Observable } from 'rxjs';
import { IAsset } from '../models';

export interface ISymbolService {
    findMany(query: string): Observable<IAsset[]>;
}