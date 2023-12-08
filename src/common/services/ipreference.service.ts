import { IPreference } from "../models";
import { Observable } from "rxjs";

export interface IPreferenceService {
    findAll(): Observable<IPreference>;
}
