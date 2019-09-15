import { HttpCode } from './data/httpCode';
import { IData, IMessage, JsonData, IError } from './interface';

/**
 * @class: generate the response message to client
 */

export class resf<T, K> implements IMessage<T, K> {
  private jsonData: JsonData<T, K> = {};

  /**
   * @since: 1.0.3
   * @method: Generate a new message to client
   * @returns a class with addData(), addError() and toOutput method
   *
   */
  static get message() {
    return new resf();
  }
  /**
   * @since: 1.0.3
   * @method: HTTP Code in text
   * @returns a list of code
   *
   */
  static get code() {
    return HttpCode;
  }

  /**
   * @since 1.0.0
   * @method: Add data into response message, error property will be null when using this function
   * @param {Object} object The object contains data and httpcode
   * @returns {void} put the data into resonse message
   */
  addData = (responseMessage: IData<T>): IMessage<T, K> => {
    this.jsonData.data = responseMessage.data!;
    this.jsonData.errors = {
      httpCode: responseMessage.httpCode,
      clientMessage: null,
      technicalErrors: null
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

  addError = (responseMessage: IError<K>): IMessage<T, K> => {
    this.jsonData.data = null;
    this.jsonData.status = HttpCode[responseMessage.httpCode];
    this.jsonData.errors = {
      httpCode: responseMessage.httpCode,
      clientMessage: responseMessage.clientMessage,
      technicalErrors: responseMessage.technicalErrors
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
