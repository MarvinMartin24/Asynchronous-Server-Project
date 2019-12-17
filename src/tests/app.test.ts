require('custom-env').env(process.env.APP_ENV);
import mongoose from 'mongoose';
import { UserSchema } from '../lib/models/userModel';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

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
        })
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });

    describe('Database Tests', () => {
        it('Add User', (done) => {
            User.create(UserTest).then((doc) => {
                done();
            })
        });

        it('Get User', (done) => {
            User.findOne({ email: 'hello@world.com' }).then((doc) => {
                chai.expect(doc).to.exist;
                done();
            })
        });
    });

    describe('API Tests', () => {
      let token;
      let user = {
                firstName: "hello",
                lastName: "world",
                email: "hello@world.com",
                password: "azerty"
      }
      it('Post Register', (done) => {
        chai.request(server)
            .post('/user/register')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.email.should.be.eq(user.email);
                  res.body.lastName.should.be.eq(user.lastName);
                  res.body.firstName.should.be.eq(user.firstName);
              done();
            });
      });

      it('Post authenticate', (done) => {
        chai.request(server)
            .post('/user/authenticate')
            .send({ email: user.email, password: user.password })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.token.should.not.be.a('undefined');
                  token = res.body.data.token;
              done();
            });
      });

      it('Access User Info', (done) => {
        chai.request(server)
            .get('/me')
            .set({ token: token })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.email.should.be.eq(user.email);
                res.body.lastName.should.be.eq(user.lastName);
                res.body.firstName.should.be.eq(user.firstName);
                done();
            })
    });

  });

});

export = {};
