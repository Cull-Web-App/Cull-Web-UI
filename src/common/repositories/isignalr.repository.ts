import { Observable } from 'rxjs';

export interface ISignalRRepository {
    connect(url: string): Observable<void>;
    disconnect(): Observable<void>;
    register(event: string, callback: (...args: any[]) => void): void;
    deregister(event: string, callback: (...args: any[]) => void): void;
    invoke<T>(event: string, ...args: any[]): Observable<T>;
}
