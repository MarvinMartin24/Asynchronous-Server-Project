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
            res.status(200).json({status:"success", message: "data created", data:{metrics:data}});
        }).catch((err) => {
            res.status(400).json(err);
        });
    }

    public getMetricsbyId (req: Request, res: Response) {
        Metric.find({userId: req.body.user._id}, (err, metrics) => {
            if(err){
                res.send(err);
            }
            res.status(200).json({status:"success", message: "data created", data:{metrics:metrics}});
        });
    }

    public updateFirstMetricById (req: Request, res: Response) {
        Metric.findOneAndUpdate({"userId": req.body.user._id},
        {
                userId: req.body.user._id,
                value: newValue(),
        }, (err, metric) => {
            if (err) {
                return err;
            } else {
                res.status(200).send({status:"success", message: "Metric updated"});
                }
        })
    }

    public updateMetricById (req: Request, res: Response) {
        Metric.findOneAndUpdate({"_id":req.params.id},
        {
                userId: req.body.user._id,
                value: newValue(),
        }, (err, metric) => {
            if (err) {
                return err;
            } else {
                res.status(200).send({status:"success", message: "Metric updated"});
                }
        })
    }

    public deleteFirstMetricById (req: Request, res: Response) {
        Metric.deleteOne({"userId" : req.body.user._id}, (err, metric) => {
            if(err){
                res.send(err);
            }
            if (!metric){
                res.status(404).json({status:"error", message: "Metric not found"});
            }
            res.status(200).json({status:"success", message: "Metric deleted"});
        });
    }

    public deleteMetricById (req: Request, res: Response) {
        Metric.deleteOne({"_id": req.params.id}, (err, metric) => {
            if(err){
                res.send(err);
            }
            if (!metric){
                res.status(404).json({status:"error", message: "Metric not found"});
            }
            res.status(200).json({status:"success", message: "Metric deleted"});
        });
    }
}
