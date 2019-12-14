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
        // Contact
        app.route('/users')
            .get(this.userController.getUsers)
            // POST endpoint
            .post(this.userController.addUser);
        // Contact detail
        app.route('/user/:email')
            // get specific contact
            .get(this.userController.getUserWithEmail);
        // .put(this.userController.updateContact)
        // .delete(this.userController.deleteContact)
    };
    return Routes;
}());
exports.Routes = Routes;
