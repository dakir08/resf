import { errorResponse } from '../displayError';
import { HttpCode } from '../data/httpCode';
/**
 * test 1:
 * A simple error
 */
test('Simple error', () => {
  const result = errorResponse({
    clientMessage: 'Please contact to supporter',
    httpCode: 404,
    technicalErrors: 'Cannot read value from url'
  });

  const actual = {
    errors: {
      technicalErrors: 'Cannot read value from url',
      clientMessage: 'Please contact to supporter',
      httpCode: 404
    },
    status: 'Not Found',
    data: null
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 2:
 * A complicated error
 */
test('A complicated error', () => {
  const result = errorResponse({
    clientMessage: 'Please contact to supporter',
    httpCode: HttpCode.Forbidden,
    technicalErrors: {
      error: 'Cannot load library',
      from: 'line 4 file test.js'
    }
  });

  const actual = {
    errors: {
      technicalErrors: {
        error: 'Cannot load library',
        from: 'line 4 file test.js'
      },
      clientMessage: 'Please contact to supporter',
      httpCode: 403
    },
    status: 'Forbidden',
    data: null
  };
  expect(result).toStrictEqual(actual);
});
