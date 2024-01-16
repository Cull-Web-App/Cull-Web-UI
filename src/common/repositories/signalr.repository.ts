import { ISignalRRepository } from "./isignalr.repository";
import { inject, injectable } from "inversify";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Observable, from, switchMap, timeout } from "rxjs";
import { IPublicClientApplication } from "@azure/msal-browser";
import { IDENTIFIERS } from "../ioc/identifiers.ioc";
import { scopeMap } from "../config";

@injectable()
export class SignalRRepository implements ISignalRRepository {
    protected connection: HubConnection | null = null;
    protected connectionPromise: Promise<void> | null = null;

    private readonly hubConnectionBuilder!: HubConnectionBuilder;
    @inject(IDENTIFIERS.IMSAL_INSTANCE) private readonly msalInstance!: IPublicClientApplication;

    public constructor() {
        this.hubConnectionBuilder = new HubConnectionBuilder();
    }

    public connect(url: string): Observable<void> {
        if (this.connection) {
            console.warn('Connection is already established');
            return from(this.connectionPromise!);
        }
        this.connection = this.hubConnectionBuilder.withUrl(url, {
            accessTokenFactory: async () => {
                const account = this.msalInstance.getAllAccounts()[0];
                if (!account) {
                    throw new Error('No account found');
                }
                const baseUrl = new URL(url).origin;
                const scopes = scopeMap.get(baseUrl);
                if (!scopes) {
                    throw new Error(`No scopes found for ${baseUrl}`);
                }
                const token = await this.msalInstance.acquireTokenSilent({ scopes, account }).catch(e => console.error(e)) as any;
                return token.accessToken;
            }
        }).withAutomaticReconnect().build();
        this.connectionPromise = this.connection.start();

        return from(this.connectionPromise);
    }

    public disconnect(): Observable<void> {
        if (!this.connection) {
            console.warn('Connection is not established');
            return from(Promise.resolve());
        } else {
            return from(this.connection?.stop());
        }
    }

    public registerAll(registrationMap: Map<string, (...args: any[]) => void>): void {
        registrationMap.forEach((value, key) => {
            this.register(key, value);
        });
    }

    public deregisterAll(registrationMap: Map<string, (...args: any[]) => void>): void {
        registrationMap.forEach((value, key) => {
            this.deregister(key, value);
        });
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

        // Ensure the connection is established before invoking
        // timeout if it takes longer than 30 seconds
        // use observables
        return new Observable<void>(observer => {
            if (this.connection?.state === 'Connected') {
                observer.next();
                observer.complete();
            } else {
                this.connectionPromise?.then(() => {
                    observer.next();
                    observer.complete();
                }).catch(error => observer.error(error));
            }
        }).pipe(
            switchMap(() => {
                return from(this.connection!.invoke(event, ...args));
            }),
            timeout(30000)
        );
    }
}