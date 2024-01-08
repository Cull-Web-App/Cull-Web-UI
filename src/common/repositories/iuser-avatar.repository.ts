import { Observable } from "rxjs";

export interface IUserAvatarRepository {
    findOne(): Observable<Blob>;
}
