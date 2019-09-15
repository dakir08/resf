import { resf } from '../index';

/**
 * Test 1:
 * A normal string
 */
test('Normal data', () => {
  const result = resf.message
    .addData({
      data: 'THIS IS SAMPLE TEST 1',
      httpCode: 200
    })
    .toOutput();

  const actual = {
    errors: {
      technicalErrors: null,
      clientMessage: null,
      httpCode: 200
    },
    status: 'OK',
    data: 'THIS IS SAMPLE TEST 1'
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 2:
 * An array of data
 */
test('Normal data', () => {
  const result = resf.message
    .addData({
      data: [1, '232', 'This is a string', [1, 2, 3]],
      httpCode: resf.code['Not Found']
    })
    .toOutput();

  const actual = {
    errors: {
      technicalErrors: null,
      clientMessage: null,
      httpCode: 404
    },
    status: 'Not Found',
    data: [1, '232', 'This is a string', [1, 2, 3]]
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 2:
 * An array of data
 */
test('array data', () => {
  const result = resf.message
    .addData({
      data: [1, '232', 'This is a string', [1, 2, 3]],
      httpCode: resf.code['Not Found']
    })
    .toOutput();

  const actual = {
    errors: {
      technicalErrors: null,
      clientMessage: null,
      httpCode: 404
    },
    status: 'Not Found',
    data: [1, '232', 'This is a string', [1, 2, 3]]
  };
  expect(result).toStrictEqual(actual);
});

/**
 * test 3:
 * Add data then add error
 */
test('Add data then fix to error', () => {
  const result = resf.message
    .addData({
      data: [1, '232', 'This is a string', [1, 2, 3]],
      httpCode: resf.code['Not Found']
    })
    .addError({
      clientMessage: 'Please contact to supporter',
      httpCode: 404,
      technicalErrors: 'Cannot read value from url'
    })
    .toOutput();

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
 * test 4:
 * Add error
 */
test('Display error', () => {
  const result = resf.message
    .addError({
      clientMessage: 'Please contact to supporter',
      httpCode: 404,
      technicalErrors: 'Cannot read value from url'
    })
    .toOutput();

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
 * test 5:
 * Code testing
 */
test('HTTP Code testing', () => {
  const result = resf.code['Partial Content'];

  const actual = 206;
  expect(result).toStrictEqual(actual);
});

/**
 * test 6:
 * Object data
 */
test('Add object and use message code', () => {
  const result = resf.message
    .addData({
      data: {
        id: 'n_bZUqbKM6Y',
        name: 'Dota 2 Daily WTF - Bait Master',
        duration: '00:01:42'
      },
      httpCode: resf.code.Created
    })
    .toOutput();

  const actual = {
    errors: {
      technicalErrors: null,
      clientMessage: null,
      httpCode: 201
    },
    status: 'Created',
    data: {
      id: 'n_bZUqbKM6Y',
      name: 'Dota 2 Daily WTF - Bait Master',
      duration: '00:01:42'
    }
  };
  expect(result).toStrictEqual(actual);
});
