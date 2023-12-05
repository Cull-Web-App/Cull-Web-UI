import { Observable } from 'rxjs';

export interface ISymbolService {
    findAll(): Observable<string[]>;
}