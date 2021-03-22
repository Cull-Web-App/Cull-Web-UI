export enum HTTPMethodTypes
{
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS',
    TRACE = 'TRACE'
}

export interface HTTPRequestConfig
{
    method?: HTTPMethodTypes;
    headers: any;
    params?: any;
    body?: any;
}

export interface HTTPResponse<T = any>  {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: HTTPRequestConfig;
    request?: any;
  }