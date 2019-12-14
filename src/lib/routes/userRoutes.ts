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

        // Contact
        app.route('/users')
        .get(this.userController.getUsers)

        // POST endpoint
        .post(this.userController.addUser);

        // Contact detail
        app.route('/user/:email')

        // get specific contact
        .get(this.userController.getUserWithEmail)
        // .put(this.userController.updateContact)
        // .delete(this.userController.deleteContact)

    }
}
