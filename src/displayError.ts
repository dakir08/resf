import { HttpCode } from './data/httpCode';

import { IError, JsonData } from './interface';

/**
 * @since 1.0.10
 * @method: Add error into response message, data will be null when using this function
 * @param {Object} object The object contains http code,technical error and client friendly error
 * @returns {JsonData} return the formatted response message with data to client
 */
export function errorResponse<T, K>(
  responseMessage: IError<K>
): JsonData<T, K> {
  const result: JsonData<T, K> = {
    data: null,
    status: HttpCode[responseMessage.httpCode],
    errors: {
      httpCode: responseMessage.httpCode,
      clientMessage: responseMessage.clientMessage,
      technicalErrors: responseMessage.technicalErrors
    }
  };

  return result;
}
