import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";
import { MetricController } from "../controllers/metricController";


export class Routes {

    public userController: UserController = new UserController()
    public metricController: MetricController = new MetricController()


    public routes(app): void {

        // API
        app.route('/api/users')
        .get(this.userController.getAllUsers);

        app.route('/api/profile')
        .get(this.userController.validateUser, this.userController.getUserbyId);

        app.route('/api/user/:email')
        .get(this.userController.getUserWithEmail)

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

        app.route('/api/profile/metric/delete/:id')
        .delete(this.userController.validateUser, this.metricController.deleteMetricById);

        app.route('/api/profile/metric/update/:id')
        .put(this.userController.validateUser, this.metricController.updateMetricById);

    }
}
