import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";
import { MetricController } from "../controllers/metricController";


export class Routes {

    public userController: UserController = new UserController()
    public metricController: MetricController = new MetricController()


    public routes(app): void {

        app.set('view engine','ejs');
        app.set('views', __dirname + "./../../view")

        app.route('/')
        .get((req: Request, res: Response) => {
             res.redirect('/login')
        })

        app.route('/login')
        .get((req: Request, res: Response) => {
            res.render('login.ejs')
        })

        // API
        app.route('/users')
        .get(this.userController.getAllUsers);

        app.route('/me')
        .get(this.userController.validateUser, this.userController.getUserbyId);

        app.route('/user/:email')
        .get(this.userController.getUserWithEmail)

        app.route('/user/register')
        .post(this.userController.addUser);

        app.route('/user/authenticate')
        .post(this.userController.authenticate);

        app.route('/me/add-metric')
        .post(this.userController.validateUser, this.metricController.addMetric);

        app.route('/me/metrics')
        .get(this.userController.validateUser, this.metricController.getMetricsbyId);

    }
}
