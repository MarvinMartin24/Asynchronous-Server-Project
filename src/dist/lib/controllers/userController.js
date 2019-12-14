"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userModel_1 = require("../models/userModel");
var jwt = require('jsonwebtoken');
var User = mongoose_1.default.model('User', userModel_1.UserSchema);
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.addUser = function (req, res) {
        var newUser = new User(req.body);
        User.create(newUser)
            .then(function (data) {
            res.status(200).json(data);
        }).catch(function (err) {
            res.status(400).json(err);
        });
    };
    UserController.prototype.authenticate = function (req, res) {
        User.findOne({ email: req.body.email }).then(function (user) {
            if (!user) {
                res.json('Not in the Database.');
            }
            else {
                user.comparePassword(req.body.password).then(function () {
                    var token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.status(200).json({ status: "success", message: "User found", data: { user: user, token: token } });
                }).catch(function (err) {
                    if (!err) {
                        res.status(404).json({ status: "error", message: "Invalid email/password", data: null });
                    }
                    else {
                        res.status(404).json({ status: "error", message: "Problem", data: null });
                    }
                });
            }
        }).catch(function (err) {
            res.status(404).json({ message: "Error" });
        });
    };
    UserController.prototype.validateUser = function (req, res, next) {
        var token = req.headers.token;
        if (!token) {
            return res.status(401).json({ status: "error", message: "No token" });
        }
        jwt.verify(token, req.app.get('secretKey'), function (err, payload) {
            if (err) {
                res.status(401).json({ status: "error", message: "Error" });
            }
            else {
                User.findById(payload.id, function (err, user) {
                    if (!user) {
                        return res.status(401).json({ status: "error", message: "User not found" });
                    }
                    else {
                        req.body.user = user;
                        next();
                    }
                });
            }
        });
    };
    UserController.prototype.getAllUsers = function (req, res) {
        User.find({}, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    };
    UserController.prototype.getUserbyId = function (req, res) {
        User.findById(req.body.user._id, function (err, user) {
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
