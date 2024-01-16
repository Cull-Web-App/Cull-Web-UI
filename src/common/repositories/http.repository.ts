import axios, { AxiosRequestConfig } from 'axios';
import { Observable, from } from 'rxjs';
import { HTTPResponse } from '../models';
import { IHttpRepository } from './ihttp.repository';
import { injectable } from 'inversify';

@injectable()
export class HttpRepository implements IHttpRepository {

    public get<T>(url: string, params?: unknown): Observable<HTTPResponse<T>> {
        return from(
            axios.get(url, {
                method: 'GET',
                params
            } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
        )
    }

    public post<T>(url: string, body: unknown): Observable<HTTPResponse<T>> {
        return from(
            axios.post(url, body, {
                method: 'POST'
            } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
        )
    }

    public put<T>(url: string, body: unknown): Observable<HTTPResponse<T>> {
        return from(
            axios.put(url, body, {
                method: 'PUT'
            } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
        )
    }

    public delete<T>(url: string, params?: unknown, useBody: boolean = false): Observable<HTTPResponse<T>> {
        if (useBody) {
            return from(
                axios.delete(url, {
                    method: 'DELETE',
                    data: params
                } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
            );
        } else {
            return from(
                axios.delete(url, {
                    method: 'DELETE',
                    params
                } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
            )
        }
    }
}