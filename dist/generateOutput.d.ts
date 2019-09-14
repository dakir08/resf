import { HttpCode } from './data/httpCode';
interface IData<T> {
    httpCode: HttpCode;
    data: T | null;
}
interface IError<T> {
    httpCode: HttpCode;
    technicalError: T | null;
    clientMessage: string | null;
}
interface JsonData<T, K> {
    error?: {
        technicalError: K | null;
        clientMessage: string | null;
        httpCode: HttpCode;
    };
    status?: string | 'OK';
    data?: T | null;
}
export declare const isValidHttpCode: (code: number) => boolean;
export declare const test: (code: HttpCode) => any;
export default class HttpResponse<T, K> {
    private jsonData;
    addData: (responseMessage: IData<T>) => this;
    addError: (responseMessage: IError<K>) => this;
    toOutput: () => JsonData<T, K>;
}
export {};
