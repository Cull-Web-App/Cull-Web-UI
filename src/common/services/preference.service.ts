import { Observable, of } from "rxjs";
import { IPreferenceService } from "./ipreference.service";
import { IPreference, Preference } from "../models";
import { injectable } from "inversify";

@injectable()
export class PreferenceService implements IPreferenceService {
    public findAll(): Observable<IPreference> {
        return of(new Preference(true));
    }
}
