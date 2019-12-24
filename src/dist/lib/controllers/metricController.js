"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Metric = require('../models/metricModel');
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
            res.status(200).json({ status: "success", message: "data created", data: { metrics: data } });
        }).catch(function (err) {
            res.status(400).json(err);
        });
    };
    MetricController.prototype.getMetricsbyId = function (req, res) {
        Metric.find({ userId: req.body.user._id }, function (err, metrics) {
            if (err) {
                res.send(err);
            }
            res.status(200).json({ status: "success", message: "data created", data: { metrics: metrics } });
        });
    };
    MetricController.prototype.updateFirstMetricById = function (req, res) {
        Metric.findOneAndUpdate({ "userId": req.body.user._id }, {
            userId: req.body.user._id,
            value: newValue(),
        }, function (err, metric) {
            if (err) {
                return err;
            }
            else {
                res.status(200).send({ status: "success", message: "Metric updated" });
            }
        });
    };
    MetricController.prototype.updateMetricById = function (req, res) {
        Metric.findOneAndUpdate({ "_id": req.params.id }, {
            userId: req.body.user._id,
            value: newValue(),
        }, function (err, metric) {
            if (err) {
                return err;
            }
            else {
                res.status(200).send({ status: "success", message: "Metric updated" });
            }
        });
    };
    MetricController.prototype.deleteFirstMetricById = function (req, res) {
        Metric.deleteOne({ "userId": req.body.user._id }, function (err, metric) {
            if (err) {
                res.send(err);
            }
            if (!metric) {
                res.status(404).json({ status: "error", message: "Metric not found" });
            }
            res.status(200).json({ status: "success", message: "Metric deleted" });
        });
    };
    MetricController.prototype.deleteMetricById = function (req, res) {
        Metric.deleteOne({ "_id": req.params.id }, function (err, metric) {
            if (err) {
                res.send(err);
            }
            if (!metric) {
                res.status(404).json({ status: "error", message: "Metric not found" });
            }
            res.status(200).json({ status: "success", message: "Metric deleted" });
        });
    };
    return MetricController;
}());
exports.MetricController = MetricController;
