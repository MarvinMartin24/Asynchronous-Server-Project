// Mongo
import db = require('./dbUtils');

export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}


export function getUser(first_name: string, cb:(err, user?:User) => void) {
    db.getDb().collection('users').findOne({first_name: first_name}, (err, user:User) => {
        if (err) return cb(err);
        return cb(null, user);
    })
}

export function addUsers(users, cb:(err, users) => void) {
    db.getDb().collection('users').insertMany(users, function(err, res) {
        if (err) throw err;
        console.log(res.insertedCount+" documents inserted");
        return cb(null, res);
    });
}
