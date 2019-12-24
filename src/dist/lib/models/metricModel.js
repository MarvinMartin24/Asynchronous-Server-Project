"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var MetricSchema = new Schema({
    userId: {
        type: String
    },
    value: {
        type: Number
    },
    date: {
        type: Date
    }
}, { collection: 'metrics' });
var Metric = mongoose_1.default.model('Metric', MetricSchema);
module.exports = Metric;
