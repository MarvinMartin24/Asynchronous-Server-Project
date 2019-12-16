"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require('custom-env').env(process.env.APP_ENV);
var mongoose_1 = __importDefault(require("mongoose"));
var userModel_1 = require("../lib/models/userModel");
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);
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
        });
    });
    after(function (done) {
        mongoose_1.default.connection.close();
        done();
    });
    describe('Database Tests', function () {
        it('Add User', function (done) {
            User.create(UserTest).then(function (doc) {
                done();
            });
        });
        it('Get User', function (done) {
            User.findOne({ email: 'hello@world.com' }).then(function (doc) {
                chai.expect(doc).to.exist;
                done();
            });
        });
    });
    describe('API Tests', function () {
        var token;
        var user = {
            firstName: "hello",
            lastName: "world",
            email: "hello@world.com",
            password: "azerty"
        };
        it('Post Register', function (done) {
            chai.request(server)
                .post('/user/register')
                .send(user)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.email.should.be.eq(user.email);
                res.body.lastName.should.be.eq(user.lastName);
                res.body.firstName.should.be.eq(user.firstName);
                done();
            });
        });
        it('Post authenticate', function (done) {
            chai.request(server)
                .post('/user/authenticate')
                .send({ email: user.email, password: user.password })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.token.should.not.be.a('undefined');
                token = res.body.data.token;
                done();
            });
        });
        it('Access User Info', function (done) {
            chai.request(server)
                .post('/user/me')
                .set({ token: token })
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.email.should.be.eq(user.email);
                res.body.lastName.should.be.eq(user.lastName);
                res.body.firstName.should.be.eq(user.firstName);
                done();
            });
        });
    });
});
module.exports = {};
