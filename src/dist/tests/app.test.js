"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require('custom-env').env(process.env.APP_ENV);
var chai_1 = require("chai");
var mongoose_1 = __importDefault(require("mongoose"));
var userModel_1 = require("../lib/models/userModel");
var User = mongoose_1.default.model('User', userModel_1.UserSchema);
var UserTest = new User({
    firstName: "hello",
    lastName: "world",
    email: "hello@world.com",
    password: "azerty"
});
describe('Tests', function () {
    before(function (done) {
        mongoose_1.default.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(function () {
            done();
        }).catch(done);
    });
    after(function (done) {
        mongoose_1.default.connection.close();
        done();
    });
    describe('Database Tests', function () {
        it('Add User', function (done) {
            User.create(UserTest).then(function (doc) {
                done();
            }).catch(done);
        });
        it('Get User', function (done) {
            User.findOne({ email: 'hello@world.com' }).then(function (doc) {
                chai_1.expect(doc).to.exist;
                done();
            }).catch(done);
        });
    });
});
module.exports = {};
