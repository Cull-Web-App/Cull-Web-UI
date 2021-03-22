import { inject, injectable } from 'inversify';
import { User } from '../models';
import { SERVICE_IDENTIFIERS } from '../constants';
import { IAuthService, IUserService } from '../interfaces';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@injectable()
export class UserService implements IUserService
{
    public constructor(
        @inject(SERVICE_IDENTIFIERS.IAUTH_SERVICE) private readonly authService: IAuthService)
    {

    }

    /**
     * Registers a new user
     * @param user User to be registered
     */
    public register(user: User): Observable<any>
    {
        return this.authService.signUp(user);
    }

    /**
     * Login a user
     * @param user User logging in
     * @param checked True if "Remember me" is checked
     */
    public login(user: User, checked: boolean): Observable<Partial<User>>
    {
        const signIn$: Observable<Partial<User>> = this.authService.signIn(user.email, user.password as string);

        return !checked ? this.authService.configure({ storage: sessionStorage }).pipe(
            switchMap(() => signIn$)
        ) : signIn$;
    }

    /**
     * Logout the currently signed in user
     */
    public logout(): Observable<any>
    {
        return this.authService.logout();
    }
}