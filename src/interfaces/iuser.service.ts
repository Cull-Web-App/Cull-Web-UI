import { Observable } from 'rxjs';
import { User } from '../models';

export interface IUserService
{
    register(user: User): Observable<any>;
    login(user: User, checked: boolean): Observable<Partial<User>>;
    logout(): Observable<any>;
}
