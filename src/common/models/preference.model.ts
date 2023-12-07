import { IPreference } from "./ipreference.model";

export class Preference implements IPreference {
    constructor(
        public darkMode: boolean = false
    ) { }
}
