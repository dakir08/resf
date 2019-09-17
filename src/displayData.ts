import { HttpCode } from './data/httpCode';

import { IData, JsonData } from './interface';

/**
 * @since 1.0.10
 * @method: Add data into response message, error property will be null when using this function
 * @param {Object} object The object contains data and httpcode
 * @returns {JsonData} return the formatted response message with data to client
 */
export function dataResponse<T, K>(responseMessage: IData<T>): JsonData<T, K> {
  const result: JsonData<T, K> = {
    status: HttpCode[responseMessage.httpCode],
    errors: {
      httpCode: responseMessage.httpCode,
      clientMessage: null,
      technicalErrors: null
    },
    data: responseMessage.data
  };

  return result;
}
