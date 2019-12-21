require('custom-env').env(process.env.APP_ENV);
import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./lib/routes/routes";
import mongoose from "mongoose";
const path = require('path');


class App {

    public app: express.Application = express();
    public route: Routes = new Routes();
    public mongoUrl: string = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    constructor() {
        this.appSetup();
        this.mongoSetup();
        this.route.routes(this.app);
    }

    private appSetup(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use("/static", express.static(path.join(__dirname, '/view')));
        this.app.set('view engine','ejs');
        this.app.set('views', __dirname + "/view")
        this.app.set('secretKey', 'nodeRestApi-ECE'); // jwt secret token
        this.app.use('/', require('./view/view'));

    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    }

}

export default new App().app;
