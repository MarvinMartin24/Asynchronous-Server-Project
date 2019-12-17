"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var metricModel_1 = require("../models/metricModel");
var Metric = mongoose_1.default.model('Metric', metricModel_1.MetricSchema);
var newValue = function () {
    return Math.floor(Math.random() * 100) + 1;
};
var newDate = function () {
    return new Date();
};
var MetricController = /** @class */ (function () {
    function MetricController() {
    }
    MetricController.prototype.addMetric = function (req, res) {
        var newMetric = {
            userId: req.body.user._id,
            value: newValue(),
            date: newDate()
        };
        newMetric = new Metric(newMetric);
        Metric.create(newMetric)
            .then(function (data) {
            res.status(200).json(data);
        }).catch(function (err) {
            res.status(400).json(err);
        });
    };
    MetricController.prototype.getMetricsbyId = function (req, res) {
        Metric.find({ userId: req.body.user._id }, function (err, metrics) {
            if (err) {
                res.send(err);
            }
            res.json(metrics);
        });
    };
    return MetricController;
}());
exports.MetricController = MetricController;
