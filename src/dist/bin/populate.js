"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userModel_1 = require("../lib/models/userModel");
mongoose_1.default.connect('mongodb://mongo:27017/app', { useNewUrlParser: true, useUnifiedTopology: true });
var User = mongoose_1.default.model('User', userModel_1.UserSchema);
var User1 = new User({
    firstName: "marvin",
    lastName: "martin",
    email: "marvin@gmail.com",
    password: "1234"
});
var User2 = new User({
    firstName: "tim",
    lastName: "martin",
    email: "tim@gmail.com",
    password: "azerty"
});
var User3 = new User({
    firstName: "heloise",
    lastName: "tribeaudau",
    email: "heloise@gmail.com",
    password: "helo"
});
var User4 = new User({
    firstName: "danny",
    lastName: "martin",
    email: "danny@gmail.com",
    password: "dmartin"
});
User.create([User1, User2, User3, User4])
    .then(function (data) {
    console.log(data, "Populated !");
    mongoose_1.default.connection.close();
}).catch(function (err) {
    console.log("Not Populated...");
});
