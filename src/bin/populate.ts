import mongoose from 'mongoose';
import { UserSchema } from '../lib/models/userModel';

mongoose.connect('mongodb://mongo:27017/app', {useNewUrlParser: true, useUnifiedTopology: true});
const User = mongoose.model('User', UserSchema);

var User1 = new User({
        firstName: "marvin",
        lastName: "martin",
        email: "marvin@gmail.com",
        password: "1234"
    });

var User2 = new User({
        firstName: "tim",
        lastName: "martin",
        email: "tim@gmail.com",
        password: "azerty"
    });

var User3 = new User({
        firstName: "heloise",
        lastName: "tribeaudau",
        email: "heloise@gmail.com",
        password: "helo"
    });

var User4 = new User({
        firstName: "danny",
        lastName: "martin",
        email: "danny@gmail.com",
        password: "dmartin"
    });


User.create([User1, User2, User3, User4])
  .then((data)=>{
    console.log(data, "Populated !")
    mongoose.connection.close();
  }).catch((err)=>{
    console.log("Not Populated...")
  })
