export { HttpCode } from './data/httpCode';

export { HttpResponse } from './generateOutput';

import { HttpResponse } from './generateOutput';

const a = new HttpResponse();

const test = a
  .addData({
    data: 1,
    httpCode: 200
  })
  .toOutput();

const test2 = a
  .addError({
    clientMessage: '1',
    httpCode: 500,
    technicalError: {
      error: 1
    }
  })
  .toOutput();

console.log(test);
console.log(test2);
