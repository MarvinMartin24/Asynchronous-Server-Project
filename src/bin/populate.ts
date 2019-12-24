require('custom-env').env(process.env.APP_ENV);
import mongoose from 'mongoose';
var User = require('../lib/models/userModel');
var Metric = require('../lib/models/metricModel');


mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.collections['users'].drop();
mongoose.connection.collections['metrics'].drop();


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
        password: "@marvin"
    });

var Metric1 = new Metric({
        userId: User1._id,
        value: newValue(),
        date: newDate(),
    });

var Metric11 = new Metric({
        userId: User1._id,
        value: newValue(),
        date: newDate(),
    });

var Metric111 = new Metric({
        userId: User1._id,
        value: newValue(),
        date: newDate(),
    });

var User2 = new User({
        firstName: "tim",
        lastName: "martin",
        email: "tim@gmail.com",
        password: "@timmy"
    });
var Metric2 = new Metric({
        userId: User2._id,
        value: newValue(),
        date: newDate(),
    });

var Metric22 = new Metric({
        userId: User2._id,
        value: newValue(),
        date: newDate(),
    });

var Metric222 = new Metric({
        userId: User2._id,
        value: newValue(),
        date: newDate(),
    });


User.create([User1, User2])
  .then((data)=>{
    console.log(data, "Populated (User)!")
  }).catch((err)=>{
    console.log("Not Populated (User)...")
  })

Metric.create([Metric1, Metric11, Metric111, Metric2, Metric22, Metric222])
  .then((data)=>{
    console.log(data, "Populated (Metric)!")
    mongoose.connection.close();
}).catch((err)=>{
  console.log("Not Populated (Metric) ...")
})
