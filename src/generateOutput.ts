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

/**
 * @class: generate the response message to client
 */

export class Message<T, K> {
  private jsonData: JsonData<T, K> = {};

  /**
   * @since 1.0.0
   * @method: Add data into response message, error property will be null when using this function
   * @param {Object} object The object contains data and httpcode
   * @returns {void} put the data into resonse message
   */
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

  /**
   * @since 1.0.0
   * @method: Add error into response message, data will be null when using this function
   * @param {Object} object The object contains http code,technical error and client friendly error
   * @returns {void} put the data into resonse message
   */

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

  /**
   * @since 1.0.0
   * @returns {JsonData<T,K>} returns an object that contains the final message
   */

  toOutput = (): JsonData<T, K> => {
    return this.jsonData;
  };
}
