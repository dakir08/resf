"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpCode_1 = require("./data/httpCode");
exports.isValidHttpCode = function (code) {
    return httpCode_1.HttpCode.hasOwnProperty(code);
};
exports.test = function (code) {
    return httpCode_1.HttpCode[code];
};
var HttpResponse = /** @class */ (function () {
    function HttpResponse() {
        var _this = this;
        this.jsonData = {};
        this.addData = function (responseMessage) {
            _this.jsonData.data = responseMessage.data;
            _this.jsonData.error = {
                httpCode: responseMessage.httpCode,
                clientMessage: null,
                technicalError: null
            };
            _this.jsonData.status = httpCode_1.HttpCode[responseMessage.httpCode];
            return _this;
        };
        this.addError = function (responseMessage) {
            _this.jsonData.data = null;
            _this.jsonData.status = httpCode_1.HttpCode[responseMessage.httpCode];
            _this.jsonData.error = {
                httpCode: responseMessage.httpCode,
                clientMessage: responseMessage.clientMessage,
                technicalError: responseMessage.technicalError
            };
            return _this;
        };
        this.toOutput = function () {
            return _this.jsonData;
        };
    }
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
