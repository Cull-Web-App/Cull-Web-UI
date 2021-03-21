import { Observable } from "rxjs";
import { HTTPRequestConfig, HTTPResponse } from "../models";

// Basic structure of an HTTP service -- a bit redundant on some of this
export interface IHTTPService
{
    sendGet<T>(url: string, config?: HTTPRequestConfig): Observable<HTTPResponse<T>>;
    sendPost<T>(url: string, config?: HTTPRequestConfig): Observable<HTTPResponse<T>>;
    sendPut<T>(url: string, config?: HTTPRequestConfig): Observable<HTTPResponse<T>>;
    sendDelete<T>(url: string, config?: HTTPRequestConfig): Observable<HTTPResponse<T>>;
}