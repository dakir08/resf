import { IMessage, JsonData } from './interface';
import { HttpCode } from './data/httpCode';
/**
 * @class: create a response message builder, on this class the technical errors, data will become object type
 * @author: Max Le
 */

class Message<T> implements IMessage<{}, {}> {
  private jsonData: JsonData<{}, {}> = {
    data: null,
    status: 'OK',
    errors: {
      httpCode: 200,
      clientMessage: null,
      technicalErrors: null
    }
  };

  /**
   * @since 1.0.0
   * @method: Add key and value into 'data' object, technical error property will be null when using this function
   * @param {key: string} key the key of the object
   * @param {value: any} value for the key of the object
   * @returns {void} put the key and value into data object
   */
  addData = (key: string, value: T): IMessage<{}, {}> => {
    //mark technicalErrors + clientMessage = null
    if (this.jsonData.errors) {
      this.jsonData.errors.technicalErrors = null;
      this.jsonData.errors.clientMessage = null;
    }

    //cloning
    const tData: any = { ...this.jsonData.data };
    tData[key] = value;
    this.jsonData.data = tData;

    return this;
  };

  /**
   * @since 1.1.0
   * @method: Remove key and value from data or technicalErrors object
   * @param {key: string} key the key of the object
   * @param {from: 'data' | 'technicalErrors'} from data or technicalErrors object
   * @returns {void} Remove key and value from data or technicalErrors object
   */
  removeFrom = (
    key: string,
    from: 'data' | 'technicalErrors'
  ): IMessage<{}, {}> => {
    if (this.jsonData.errors && from == 'technicalErrors') {
      delete this.jsonData.errors.technicalErrors[key];
    }

    if (from == 'data') {
      const tData: any = { ...this.jsonData.data };
      delete tData[key];
      this.jsonData.data = tData;
    }

    return this;
  };

  /**
   * @since 1.1.0
   * @method: Add client message to message
   * @param {message: string} clientMessage message that will be seen by client side
   * @returns {void} Add client message to message
   */
  clientMessage = (message: string): IMessage<{}, {}> => {
    if (this.jsonData.errors) {
      this.jsonData.errors.clientMessage = message;
    }
    return this;
  };

  /**
   * @since 1.0.0
   * @method: Add key and value into 'technicalErrors' object, data property will be null when using this function
   * @param {key: string} key the key of the object
   * @param {value: any} value for the key of the object
   * @returns {void} put the key and value into technicalErrors object
   */

  addError = (key: string, value: T): IMessage<{}, {}> => {
    // mark data = null
    this.jsonData.data = null;

    //cloning technicalErrors
    const tError: any = { ...this.jsonData.errors };
    if (tError.technicalErrors) {
      tError.technicalErrors[key] = value;
    } else {
      tError.technicalErrors = {};
      tError.technicalErrors[key] = value;
    }
    this.jsonData.errors = tError;

    return this;
  };

  /**
   * @since 1.0.0
   * @param {httpCode?: HttpCode} httpCode, the list of http code is provided on resf.HttpCode
   * @returns {JsonData} returns an object that contains the final message
   */

  toOutput = (code: HttpCode): JsonData<{}, {}> => {
    //add Http code to the message
    this.jsonData.status = HttpCode[code];
    if (this.jsonData.errors) {
      this.jsonData.errors.httpCode = code;
    }

    return this.jsonData;
  };
}

/**
 * @function: create a response message builder, on this class the technical errors, data will become object type
 */
export const message = <T>(): Message<T> => {
  return new Message();
};
