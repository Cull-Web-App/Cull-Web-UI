import { Observable } from 'rxjs';
import { HTTPResponse } from '../models';

export interface IHttpRepository {
    get<T>(url: string, params?: unknown): Observable<HTTPResponse<T>>;
    post<T>(url: string, body: unknown): Observable<HTTPResponse<T>>;
}