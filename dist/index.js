"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpCode_1 = require("./data/httpCode");
exports.HttpCode = httpCode_1.HttpCode;
var generateOutput_1 = require("./generateOutput");
exports.HttpResponse = generateOutput_1.HttpResponse;
var generateOutput_2 = require("./generateOutput");
var a = new generateOutput_2.HttpResponse();
var test = a
    .addData({
    data: 1,
    httpCode: 200
})
    .toOutput();
var test2 = a
    .addError({
    clientMessage: '2',
    httpCode: 500,
    technicalError: {
        error: 1
    }
})
    .toOutput();
console.log(test);
console.log(test2);
