import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const MetricSchema = new Schema({
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
