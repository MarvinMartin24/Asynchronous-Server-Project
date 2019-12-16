import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";

export class Routes {

    public userController: UserController = new UserController()

    public routes(app): void {

        app.set('view engine','ejs');
        app.set('views', __dirname + "./../../view")

        app.route('/')
        .get((req: Request, res: Response) => {
             res.render('hello.ejs')
        })

        // Users
        app.route('/users')
        .get(this.userController.getAllUsers);

        app.route('/user/me')
        .get(this.userController.validateUser, this.userController.getUserbyId);

        app.route('/user/:email')
        .get(this.userController.getUserWithEmail)

        app.route('/user/register')
        .post(this.userController.addUser);

        app.route('/user/authenticate')
        .post(this.userController.authenticate);

    }
}
