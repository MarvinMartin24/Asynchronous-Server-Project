"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var jwt = require('jsonwebtoken');
var User = require('../models/userModel');
mongoose_1.default.set('useFindAndModify', false);
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.addUser = function (req, res) {
        var newUser = new User(req.body);
        User.find({ email: newUser.email }, function (err, user) {
            if (err)
                throw err;
            if (Object.keys(user).length == 0) {
                User.create(newUser)
                    .then(function (data) {
                    res.status(200).json({ status: "success", message: "User created", data: { user: data } });
                }).catch(function (err) {
                    res.status(400).json(err);
                });
            }
            else {
                res.status(200).json({ status: "error", message: "User already exist" });
            }
        });
    };
    UserController.prototype.authenticate = function (req, res) {
        User.findOne({ email: req.body.email }).then(function (user) {
            if (!user) {
                res.json({ status: "error", message: 'Wrong Email', data: null });
            }
            else {
                user.comparePassword(req.body.password).then(function () {
                    var token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.status(200).json({ status: "success", message: "Login !", data: { user: user, token: token } });
                }).catch(function (err) {
                    if (!err) {
                        res.json({ status: "error", message: "Invalid Password", data: null });
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
        var token = req.headers['token'];
        if (!token) {
            return res.status(401).json({ status: "error", message: "No token" });
        }
        jwt.verify(token, req.app.get('secretKey'), function (err, decoded) {
            if (err) {
                res.status(401).json({ status: "error", message: "Error" });
            }
            else {
                User.findById(decoded.id, function (err, user) {
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
                res.send({ status: "error", message: "problem" });
            }
            res.status(200).json({ status: "success", message: "User found", data: { user: user } });
        });
    };
    UserController.prototype.updateUserById = function (req, res) {
        User.findOneAndUpdate({ "_id": req.body.user._id }, req.body, function (err, user) {
            if (err) {
                return err;
            }
            else {
                user.password = req.body.password;
                user.save(function (err, doc) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.status(200).send({ status: "success", message: "User updated" });
                    }
                });
            }
        });
    };
    UserController.prototype.deleteUserById = function (req, res) {
        User.deleteOne({ "_id": req.body.user._id }, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.status(200).json({ status: "success", message: "User deleted" });
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
