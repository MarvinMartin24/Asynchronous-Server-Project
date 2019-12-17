"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose_1.default.Schema;
exports.UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'users' });
exports.UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    next();
});
exports.UserSchema.methods.comparePassword = function (testPassword) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        bcrypt.compare(testPassword, _this.password).then(function (equal) {
            if (equal) {
                resolve(true);
            }
            else {
                reject(false);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};
