"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
exports.MetricSchema = new Schema({
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
