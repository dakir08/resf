# ResF - Simplified Response message to client

A simple response message to client with a nice format

[![Build Status](https://travis-ci.org/dakir08/resf.svg?branch=master)](https://travis-ci.org/dakir08/resf)
[![Coverage Status](https://coveralls.io/repos/github/dakir08/resf/badge.svg?branch=master)](https://coveralls.io/github/dakir08/resf?branch=master)

## Super simple to use

ResF is designed to be the simplest way to export data to client side based on Google format.

By providing data

```bash
const resf = require('resf');
const message = resf.dataResponse({ data: 'THIS IS SAMPLE TEST 1', httpCode: 200 });
```

By providing error

```bash
const resf = require('resf');
const message = resf.errorResponse({
    clientMessage: 'Please contact to supporter',
    httpCode: 404,
    technicalErrors: 'Cannot read value from url'
  });
```

## Errors

You can display error response message.

```bash
 const message = resf.errorResponse({
    clientMessage: 'Please contact to supporter',
    httpCode: resf.code.Forbidden,
    technicalErrors: {
      error: 'Cannot load library',
      from: 'line 4 file test.js'
    }
  })
```

technicalErrors can have any variable type (string and object will be preferred)

```bash
 const message = resf.errorResponse({
    clientMessage: 'Please contact to supporter',
    httpCode: 404,
    technicalErrors: 'Cannot read value from url'
  });
```

## Httpcode

The Http code can be found at resf.code

These code will be updated based on [this site](https://www.restapitutorial.com/httpstatuscodes.html)

```bash
 const code = resf.code.Forbidden // Should be 403
```

## Message Builder (Updated soon)

The instruction of this method will be updated soon.

Example of data message builder

```bash
const responseMessage = resf.message()
    .addData('id', 1)
    .addData('name', 'Max')
    .addData('email', 'sample@gmail.com')
    .addData('phone', 1234567897)
    .removeFrom('email', 'data')
    .toOutput(resf.code.Created);
```

Example of error message builder

```bash
const responseMessage = resf.message()
    .addError('warning', 'Cannot run test file')
    .addError('from', 'line 4, test.ts')
    .addError('cmd', 'This is a sample command')
    .addError('idNumber', 5)
    .clientMessage(
      'There are something trouble on the server, please contact to our technical support.'
    )
    .toOutput(resf.code['Precondition Failed']);
```

## Installation

Use the package manager [npm](https://nodejs.org/en/) to install resf.

```bash
npm i resf
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Bug

Please let me know if you have any trouble while using this package.

Current issues: It's need to reinstall everytime when to use a new version of this package.

## License

[ISC](https://choosealicense.com/licenses/isc/)
