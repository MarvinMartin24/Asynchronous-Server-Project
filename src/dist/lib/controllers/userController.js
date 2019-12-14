"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userModel_1 = require("../models/userModel");
var User = mongoose_1.default.model('User', userModel_1.UserSchema);
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.addUser = function (req, res) {
        var newUser = new User(req.body);
        newUser.save(function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };
    UserController.prototype.getUsers = function (req, res) {
        User.find({}, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };
    UserController.prototype.getUserWithEmail = function (req, res) {
        User.find({ email: req.params.email }, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };
    return UserController;
}());
exports.UserController = UserController;
