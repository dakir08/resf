import { HttpCode } from './data/httpCode';
export interface IMessage<T, K> {
  addData(responseMessage: IData<T>): IMessage<T, K>;
  addError(responseMessage: IError<K>): IMessage<T, K>;
  toOutput(): JsonData<T, K>;
}

export interface IData<T> {
  httpCode: HttpCode;
  data: T | null;
}

export interface IError<T> {
  httpCode: HttpCode;
  technicalErrors: T | null;
  clientMessage: string | null;
}

export interface JsonData<T, K> {
  errors?: {
    technicalErrors: K | null;
    clientMessage: string | null;
    httpCode: HttpCode;
  };
  status?: string | 'OK';
  data?: T | null;
}
