require('custom-env').env(process.env.APP_ENV);
import mongoose from 'mongoose';
import { UserSchema } from '../lib/models/userModel';
import { MetricSchema } from '../lib/models/metricModel';


mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', UserSchema);
const Metric = mongoose.model('Metric', MetricSchema);

var newValue = () => {
    return Math.floor(Math.random() * 100) + 1;
}

var newDate = () => {
    return new Date();
}

var User1 = new User({
        firstName: "marvin",
        lastName: "martin",
        email: "marvin@gmail.com",
        password: "1234"
    });

var Metric1 = new Metric({
        userId: User1._id,
        value: newValue(),
        date: newDate(),
    });

var User2 = new User({
        firstName: "tim",
        lastName: "martin",
        email: "tim@gmail.com",
        password: "azerty"
    });
var Metric2 = new Metric({
        userId: User2._id,
        value: newValue(),
        date: newDate(),
    });

var User3 = new User({
        firstName: "heloise",
        lastName: "tribeaudau",
        email: "heloise@gmail.com",
        password: "helo"
    });
var Metric3 = new Metric({
        userId: User3._id,
        value: newValue(),
        date: newDate(),
    });

var User4 = new User({
        firstName: "danny",
        lastName: "martin",
        email: "danny@gmail.com",
        password: "dmartin"
    });

var Metric4 = new Metric({
        userId: User4._id,
        value: newValue(),
        date: newDate(),
    });


User.create([User1, User2, User3, User4])
  .then((data)=>{
    console.log(data, "Populated (User)!")
  }).catch((err)=>{
    console.log("Not Populated (User)...")
  })

Metric.create([Metric1, Metric2, Metric3, Metric4])
  .then((data)=>{
    console.log(data, "Populated (Metric)!")
    mongoose.connection.close();
}).catch((err)=>{
  console.log("Not Populated (Metric) ...")
})
