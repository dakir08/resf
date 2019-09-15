# ResF - Simplified Response message to client

[![Build Status](https://travis-ci.org/dakir08/resf.svg?branch=master)](https://travis-ci.org/dakir08/resf)
[![Coverage Status](https://coveralls.io/repos/github/dakir08/resf/badge.svg?branch=master)](https://coveralls.io/github/dakir08/resf?branch=master)

## Super simple to use

ResF is designed to be the simplest way to export data to client side based on Google format.

```bash
const {resf} = require('resf');
const message = resf.message
  .addData({
    data: 'Output data',
    httpCode: resf.code['Loop Detected (WebDAV)']
  })
  .toOutput();
```

## Errors

You can display error response message.

```bash
 const message = resf.message
   .addError({
     clientMessage: 'Please provide a valid item from your collection!',
     httpCode: 404,
     technicalErrors: {
       errors: {
         message: "Cannot find item from database",
         issues: "Something wrong"
       }
     }
   })
   .toOutput();
```

technicalErrors can have any variable type (string and object will be preferred)

```bash
 const message = resf.message
   .addError({
     clientMessage: 'Please provide a valid item from your collection!',
     httpCode: 404,
     technicalErrors: "Could not find item from itemCollection table"
   })
   .toOutput();
```

## Installation

Use the package manager [npm](https://nodejs.org/en/) to install foobar.

```bash
npm i resf
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[ISC](https://choosealicense.com/licenses/isc/)
