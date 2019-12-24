"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('custom-env').env(process.env.APP_ENV);
var mongoose_1 = __importDefault(require("mongoose"));
var User = require('../lib/models/userModel');
var Metric = require('../lib/models/metricModel');
mongoose_1.default.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose_1.default.connection.collections['users'].drop();
mongoose_1.default.connection.collections['metrics'].drop();
var newValue = function () {
    return Math.floor(Math.random() * 100) + 1;
};
var newDate = function () {
    return new Date();
};
var User1 = new User({
    firstName: "marvin",
    lastName: "martin",
    email: "marvin@gmail.com",
    password: "@marvin"
});
var Metric1 = new Metric({
    userId: User1._id,
    value: newValue(),
    date: newDate(),
});
var Metric11 = new Metric({
    userId: User1._id,
    value: newValue(),
    date: newDate(),
});
var Metric111 = new Metric({
    userId: User1._id,
    value: newValue(),
    date: newDate(),
});
var User2 = new User({
    firstName: "tim",
    lastName: "martin",
    email: "tim@gmail.com",
    password: "@timmy"
});
var Metric2 = new Metric({
    userId: User2._id,
    value: newValue(),
    date: newDate(),
});
var Metric22 = new Metric({
    userId: User2._id,
    value: newValue(),
    date: newDate(),
});
var Metric222 = new Metric({
    userId: User2._id,
    value: newValue(),
    date: newDate(),
});
User.create([User1, User2])
    .then(function (data) {
    console.log(data, "Populated (User)!");
}).catch(function (err) {
    console.log("Not Populated (User)...");
});
Metric.create([Metric1, Metric11, Metric111, Metric2, Metric22, Metric222])
    .then(function (data) {
    console.log(data, "Populated (Metric)!");
    mongoose_1.default.connection.close();
}).catch(function (err) {
    console.log("Not Populated (Metric) ...");
});
