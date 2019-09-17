import { HttpCode } from './data/httpCode';
export interface IMessage<T, K> {
  addData(key: string, value: T): IMessage<T, K>;
  addError(key: string, value: T): IMessage<T, K>;
  toOutput(code: HttpCode): JsonData<T, K>;
  removeFrom(key: string, from: 'data' | 'technicalErrors'): IMessage<{}, {}>;
  clientMessage(message: string): IMessage<{}, {}>;
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
  errors: {
    technicalErrors: K | any;
    clientMessage: string | null;
    httpCode: HttpCode;
  };
  status: string;
  data: T | null;
}

export interface ICustomObject<T> {
  [key: string]: any;
}
