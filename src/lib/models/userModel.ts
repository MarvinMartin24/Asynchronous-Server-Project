import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{ collection: 'users' }
);

UserSchema.pre('save', function(this: any, next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    next();
});

UserSchema.methods.comparePassword = function(testPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(testPassword, this.password).then((equal) => {
            if (equal) {
                resolve(true);
            } else {
                reject(false);
            }
        }).catch((err) => {
            reject(err);
        });
    });
};

var User = mongoose.model('User', UserSchema);
export = User;
