"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var userRoutes_1 = require("./lib/routes/userRoutes");
var mongoose_1 = __importDefault(require("mongoose"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.routePrv = new userRoutes_1.Routes();
        this.mongoUrl = 'mongodb://mongo:27017/app';
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }
    App.prototype.config = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    };
    App.prototype.mongoSetup = function () {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    };
    return App;
}());
exports.default = new App().app;
