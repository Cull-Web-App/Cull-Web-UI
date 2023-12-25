import { Observable } from "rxjs";

export interface IUserAvatarService {
    findOne(): Observable<Blob>;
}
