"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require('custom-env').env(process.env.APP_ENV);
var app_1 = __importDefault(require("./app"));
if (process.env.NODE_ENV !== 'test') {
    app_1.default.listen(process.env.PORT, function () {
        console.log('Express server listening on port ' + process.env.PORT);
    });
}
module.exports = app_1.default;
