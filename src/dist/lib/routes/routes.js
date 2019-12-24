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
        // API
        app.route('/api/users')
            .get(this.userController.getAllUsers);
        app.route('/api/profile')
            .get(this.userController.validateUser, this.userController.getUserbyId);
        app.route('/api/user/:email')
            .get(this.userController.getUserWithEmail);
        app.route('/api/user/register')
            .post(this.userController.addUser);
        app.route('/api/user/authenticate')
            .post(this.userController.authenticate);
        app.route('/api/user/delete')
            .delete(this.userController.validateUser, this.userController.deleteUserById);
        app.route('/api/user/update')
            .put(this.userController.validateUser, this.userController.updateUserById);
        app.route('/api/profile/add-metric')
            .post(this.userController.validateUser, this.metricController.addMetric);
        app.route('/api/profile/metrics')
            .get(this.userController.validateUser, this.metricController.getMetricsbyId);
        app.route('/api/profile/metric/delete')
            .delete(this.userController.validateUser, this.metricController.deleteFirstMetricById);
        app.route('/api/profile/metric/update')
            .put(this.userController.validateUser, this.metricController.updateFirstMetricById);
    };
    return Routes;
}());
exports.Routes = Routes;
