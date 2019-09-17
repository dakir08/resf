import { message } from '../message';
import { HttpCode } from '../data/httpCode';
/**
 * test 1:
 * A simple data
 */
test('A simple data', () => {
  const result = message()
    .addData('id', 1)
    .toOutput(200);

  const actual = {
    errors: {
      technicalErrors: null,
      clientMessage: null,
      httpCode: 200
    },
    status: 'OK',
    data: {
      id: 1
    }
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 2:
 * A simple error
 */
test('A simple error', () => {
  const result = message()
    .addError('error', 'Could not found item')
    .toOutput(404);

  const actual = {
    errors: {
      technicalErrors: {
        error: 'Could not found item'
      },
      clientMessage: null,
      httpCode: 404
    },
    status: 'Not Found',
    data: null
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 3:
 * A complicated data
 */
test('A complicated data', () => {
  const result = message()
    .addData('id', 1)
    .addData('name', 'Max')
    .addData('email', 'sample@gmail.com')
    .addData('phone', 1234567897)
    .removeFrom('email', 'data')
    .toOutput(HttpCode.Created);

  const actual = {
    errors: {
      technicalErrors: null,
      clientMessage: null,
      httpCode: 201
    },
    status: 'Created',
    data: {
      id: 1,
      name: 'Max',
      phone: 1234567897
    }
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 4:
 * A complicated error
 */
test('A complicated error', () => {
  const result = message()
    .addError('warning', 'Cannot run test file')
    .addError('from', 'line 4, test.ts')
    .addError('cmd', 'This is a sample command')
    .addError('idNumber', 5)
    .removeFrom('from', 'technicalErrors')
    .toOutput(HttpCode.Forbidden);

  const actual = {
    errors: {
      technicalErrors: {
        warning: 'Cannot run test file',
        cmd: 'This is a sample command',
        idNumber: 5
      },
      clientMessage: null,
      httpCode: 403
    },
    status: 'Forbidden',
    data: null
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 5:
 * switch between data and error
 */
test('switch between data and error', () => {
  const result = message()
    .addData('id', 1)
    .addData('name', 'Max')
    .addData('email', 'sample@gmail.com')
    .addError('warning', 'Cannot run test file')
    .addError('from', 'line 4, test.ts')
    .addData('phone', 1234567897)
    .addError('cmd', 'This is a sample command')
    .addError('idNumber', 5)
    .removeFrom('from', 'technicalErrors')
    .removeFrom('idNumber', 'technicalErrors')
    .toOutput(HttpCode.Gone);

  const actual = {
    errors: {
      technicalErrors: {
        cmd: 'This is a sample command'
      },
      clientMessage: null,
      httpCode: 410
    },
    status: 'Gone',
    data: null
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 6:
 * A full version of error message
 */
test('A full version of error message', () => {
  const result = message()
    .addError('warning', 'Cannot run test file')
    .addError('from', 'line 4, test.ts')
    .addError('cmd', 'This is a sample command')
    .addError('idNumber', 5)
    .clientMessage(
      'There are something trouble on the server, please contact to our technical support.'
    )
    .toOutput(HttpCode['Precondition Failed']);

  const actual = {
    errors: {
      technicalErrors: {
        warning: 'Cannot run test file',
        from: 'line 4, test.ts',
        cmd: 'This is a sample command',
        idNumber: 5
      },
      clientMessage:
        'There are something trouble on the server, please contact to our technical support.',
      httpCode: 412
    },
    status: 'Precondition Failed',
    data: null
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 7:
 * Add 2 client Message
 */
test('Add 2 client Message', () => {
  const result = message()
    .clientMessage('first client message')
    .clientMessage('second client message')
    .toOutput(HttpCode['Precondition Failed']);

  const actual = {
    errors: {
      technicalErrors: null,
      clientMessage: 'second client message',
      httpCode: 412
    },
    status: 'Precondition Failed',
    data: null
  };
  expect(result).toStrictEqual(actual);
});
