import mongoose from 'mongoose';
import { Request, Response } from 'express';
var Metric = require('../models/metricModel');


var newValue = () => {
    return Math.floor(Math.random() * 100) + 1;
}

var newDate = () => {
    return new Date();
}

export class MetricController{

    public addMetric(req: Request, res: Response) {
        var newMetric = {
                userId: req.body.user._id,
                value: newValue(),
                date: newDate()
        }
        newMetric = new Metric(newMetric);
        Metric.create(newMetric)
        .then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json(err);
        });
    }

    public getMetricsbyId (req: Request, res: Response) {
        Metric.find({userId: req.body.user._id}, (err, metrics) => {
            if(err){
                res.send(err);
            }
            res.json(metrics);
        });
    }
}
