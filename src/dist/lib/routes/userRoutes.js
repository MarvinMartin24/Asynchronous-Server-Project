"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = require("../controllers/userController");
var Routes = /** @class */ (function () {
    function Routes() {
        this.userController = new userController_1.UserController();
    }
    Routes.prototype.routes = function (app) {
        app.set('view engine', 'ejs');
        app.set('views', __dirname + "./../../view");
        app.route('/')
            .get(function (req, res) {
            res.render('hello.ejs');
        });
        // Users
        app.route('/users')
            .get(this.userController.getAllUsers);
        app.route('/user/me')
            .get(this.userController.validateUser, this.userController.getUserbyId);
        app.route('/user/:email')
            .get(this.userController.getUserWithEmail);
        app.route('/user/register')
            .post(this.userController.addUser);
        app.route('/user/authenticate')
            .post(this.userController.authenticate);
    };
    return Routes;
}());
exports.Routes = Routes;
