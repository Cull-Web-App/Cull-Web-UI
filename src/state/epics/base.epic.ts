import { Epic } from "redux-observable";
import { IBaseEpic } from "./ibase.epic";

export class BaseEpic implements IBaseEpic {
    private _epics: Epic<any>[];

    public constructor() {
        this._epics = [];
    }

    public get epics(): Epic<any>[] {
        return this._epics;
    }

    public addEpic(epic: Epic<any>) {
        this._epics.push(epic);
    }

    public addEpics(epics: Epic<any>[]) {
        this._epics = this._epics.concat(epics);
    }

    public removeEpic(epic: Epic<any>) {
        this._epics = this._epics.filter(e => e !== epic);
    }

    public removeEpics(epics: Epic<any>[]) {
        this._epics = this._epics.filter(e => !epics.includes(e));
    }

    public clearEpics() {
        this._epics = [];
    }
}