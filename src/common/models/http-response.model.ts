export interface HTTPResponse<T> {
    data: T;
    status: number;
    statusText: string;
}