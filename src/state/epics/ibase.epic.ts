import { Epic } from "redux-observable";

export interface IBaseEpic {
    epics: Epic<any>[];
    addEpic(epic: Epic<any>): void;
    addEpics(epics: Epic<any>[]): void;
    removeEpic(epic: Epic<any>): void;
    removeEpics(epics: Epic<any>[]): void;
    clearEpics(): void;
}