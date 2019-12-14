require('custom-env').env(process.env.APP_ENV);
import { expect } from 'chai';
import mongoose from 'mongoose';
import { UserSchema } from '../lib/models/userModel';


const User = mongoose.model('User', UserSchema);
var UserTest= new User({
        firstName: "hello",
        lastName: "world",
        email: "hello@world.com",
        password: "azerty"
    });


describe('Tests', () => {
    before((done) => {
        mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            done();
        }).catch(done);
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });

    describe('Database Tests', () => {
        it('Add User', (done) => {
            User.create(UserTest).then((doc) => {
                done();
            }).catch(done);
        });

        it('Get User', (done) => {
            User.findOne({ email: 'hello@world.com' }).then((doc) => {
                expect(doc).to.exist;
                done();
            }).catch(done);
        });
    });
});

export = {};
