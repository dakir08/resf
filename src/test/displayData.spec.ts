import { dataResponse } from '../displayData';
import { HttpCode } from '../data/httpCode';
import { code } from '..';
/**
 * Test 1:
 * A normal string
 */
test('A normal string', () => {
  const result = dataResponse({ data: 'THIS IS SAMPLE TEST 1', httpCode: 200 });

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
test('An array of data', () => {
  const result = dataResponse({
    data: [1, '232', 'This is a string', [1, 2, 3]],
    httpCode: HttpCode['Not Found']
  });

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
 * Code testing
 */
test('HTTP Code testing', () => {
  const result = HttpCode['Partial Content'];

  const actual = 206;
  expect(result).toStrictEqual(actual);
});

/**
 * test 4:
 * Object data
 */
test('Add object and use message code', () => {
  const result = dataResponse({
    data: {
      id: 'n_bZUqbKM6Y',
      name: 'Dota 2 Daily WTF - Bait Master',
      duration: '00:01:42'
    },
    httpCode: code.Created
  });

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
