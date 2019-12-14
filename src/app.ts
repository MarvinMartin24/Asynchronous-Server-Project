import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./lib/routes/userRoutes";
import mongoose from "mongoose";

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://mongo:27017/app';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    }

}

export default new App().app;
