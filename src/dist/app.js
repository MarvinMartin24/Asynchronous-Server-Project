"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('custom-env').env(process.env.APP_ENV);
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = require("./lib/routes/routes");
var mongoose_1 = __importDefault(require("mongoose"));
var path = require('path');
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.route = new routes_1.Routes();
        this.mongoUrl = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME;
        this.appSetup();
        this.mongoSetup();
        this.route.routes(this.app);
    }
    App.prototype.appSetup = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use("/static", express_1.default.static(path.join(__dirname, '/view')));
        this.app.set('view engine', 'ejs');
        this.app.set('views', __dirname + "/view");
        this.app.set('secretKey', 'nodeRestApi-ECE'); // jwt secret token
        this.app.use('/', require('./view/view'));
    };
    App.prototype.mongoSetup = function () {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    };
    return App;
}());
exports.default = new App().app;
