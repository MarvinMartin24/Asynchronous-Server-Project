"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('custom-env').env(process.env.APP_ENV);
var app_1 = __importDefault(require("./app"));
var http_1 = __importDefault(require("http"));
http_1.default.createServer(app_1.default).listen(process.env.PORT, function () {
    console.log('Express server listening on port ' + process.env.PORT);
});
