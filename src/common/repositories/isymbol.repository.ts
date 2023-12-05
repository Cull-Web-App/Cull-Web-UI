import { Observable } from 'rxjs';
export interface ISymbolRepository {
    findAll(): Observable<string[]>;
}