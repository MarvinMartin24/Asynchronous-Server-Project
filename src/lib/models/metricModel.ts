import mongoose from 'mongoose';

var Schema = mongoose.Schema;

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
},
{ collection: 'metrics' }
);

var Metric = mongoose.model('Metric', MetricSchema);
export = Metric;
