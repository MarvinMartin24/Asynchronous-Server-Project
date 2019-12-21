"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = require("../controllers/userController");
var metricController_1 = require("../controllers/metricController");
var Routes = /** @class */ (function () {
    function Routes() {
        this.userController = new userController_1.UserController();
        this.metricController = new metricController_1.MetricController();
    }
    Routes.prototype.routes = function (app) {
        app.set('view engine', 'ejs');
        app.set('views', __dirname + "./../../view");
        app.route('/')
            .get(function (req, res) {
            res.redirect('/login');
        });
        app.route('/login')
            .get(function (req, res) {
            res.render('login.ejs');
        });
        // API
        app.route('/users')
            .get(this.userController.getAllUsers);
        app.route('/me')
            .get(this.userController.validateUser, this.userController.getUserbyId);
        app.route('/user/:email')
            .get(this.userController.getUserWithEmail);
        app.route('/user/register')
            .post(this.userController.addUser);
        app.route('/user/authenticate')
            .post(this.userController.authenticate);
        app.route('/me/add-metric')
            .post(this.userController.validateUser, this.metricController.addMetric);
        app.route('/me/metrics')
            .get(this.userController.validateUser, this.metricController.getMetricsbyId);
    };
    return Routes;
}());
exports.Routes = Routes;
