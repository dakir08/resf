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

export const isValidHttpCode = (code: number): boolean => {
  return HttpCode.hasOwnProperty(code);
};

export const test = (code: HttpCode): any => {
  return HttpCode[code];
};

export default class HttpResponse<T, K> {
  private jsonData: JsonData<T, K> = {};

  addData = (responseMessage: IData<T>): this => {
    this.jsonData.data = responseMessage.data!;
    this.jsonData.error = {
      httpCode: responseMessage.httpCode,
      clientMessage: null,
      technicalError: null
    };
    this.jsonData.status = HttpCode[responseMessage.httpCode];
    return this;
  };

  addError = (responseMessage: IError<K>): this => {
    this.jsonData.data = null;
    this.jsonData.status = HttpCode[responseMessage.httpCode];
    this.jsonData.error = {
      httpCode: responseMessage.httpCode,
      clientMessage: responseMessage.clientMessage,
      technicalError: responseMessage.technicalError
    };
    return this;
  };

  toOutput = (): JsonData<T, K> => {
    return this.jsonData;
  };
}
