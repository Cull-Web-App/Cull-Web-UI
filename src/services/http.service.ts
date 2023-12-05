import axios, { AxiosRequestConfig } from 'axios';
import { from, Observable } from 'rxjs';
import { injectable } from 'inversify';
import { IHTTPService } from '../interfaces';
import { HTTPMethodTypes, HTTPRequestConfig, HTTPResponse } from '../models';

/**
 * HTTP Service to act as a RxJS wrapper around a HTTP client, in this case axios
 * TODO: Create further abstraction of axios
 */
@injectable()
export class HTTPService implements IHTTPService
{
    public sendGet<T>(url: string, config?: HTTPRequestConfig): Observable<HTTPResponse<T>>
    {
        return from(
            axios.get(url, {
                method: HTTPMethodTypes.GET,
                ...config
            } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
        );
    }

    public sendPost<T>(url: string, config?: HTTPRequestConfig): Observable<HTTPResponse<T>>
    {
        return from(
            axios.post(url, {
                method: HTTPMethodTypes.POST,
                ...config
            } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
        );
    }

    public sendPut<T>(url: string, config?: HTTPRequestConfig): Observable<HTTPResponse<T>>
    {
        return from(
            axios.put(url, {
                method: HTTPMethodTypes.PUT,
                ...config
            } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
        );
    }

    public sendDelete<T>(url: string, config?: HTTPRequestConfig): Observable<HTTPResponse<T>>
    {
        return from(
            axios.delete(url, {
                method: HTTPMethodTypes.DELETE,
                ...config
            } as AxiosRequestConfig) as Promise<HTTPResponse<T>>
        );
    }
}