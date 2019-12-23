import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";
import { MetricController } from "../controllers/metricController";


export class Routes {

    public userController: UserController = new UserController()
    public metricController: MetricController = new MetricController()


    public routes(app): void {

        // API
        app.route('/users')
        .get(this.userController.getAllUsers);

        app.route('/user/delete/:_id')
        .delete(this.userController.deleteUser);

        app.route('/profile')
        .get(this.userController.validateUser, this.userController.getUserbyId);

        app.route('/user/:email')
        .get(this.userController.getUserWithEmail)

        app.route('/user/register')
        .post(this.userController.addUser);

        app.route('/user/authenticate')
        .post(this.userController.authenticate);

        app.route('/profile/add-metric')
        .post(this.userController.validateUser, this.metricController.addMetric);

        app.route('/profile/metrics')
        .get(this.userController.validateUser, this.metricController.getMetricsbyId);

    }
}
