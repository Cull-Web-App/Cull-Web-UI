import { ISignalRRepository } from "./isignalr.repository";
import { injectable } from "inversify";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Observable, from } from "rxjs";

@injectable()
export class SignalRRepository implements ISignalRRepository {
    protected connection: HubConnection | null = null;

    private readonly hubConnectionBuilder!: HubConnectionBuilder;

    public constructor() {
        this.hubConnectionBuilder = new HubConnectionBuilder();
    }

    public connect(url: string): Observable<void> {
        this.connection = this.hubConnectionBuilder.withUrl(url, {
            accessTokenFactory: () => sessionStorage.getItem('accessToken') || ''
        }).withAutomaticReconnect().build();

        return from(this.connection.start());
    }

    public disconnect(): Observable<void> {
        if (!this.connection) {
            throw new Error('Connection is not established');
        }
        return from(this.connection?.stop());
    }

    public register(event: string, callback: (...args: any[]) => void): void {
        this.connection?.on(event, callback);
    }

    public deregister(event: string, callback: (...args: any[]) => void): void {
        this.connection?.off(event, callback);
    }

    public invoke<T>(event: string, ...args: any[]): Observable<T> {
        if (!this.connection) {
            throw new Error('Connection is not established');
        }
        return from(this.connection?.invoke(event, ...args));
    }
}