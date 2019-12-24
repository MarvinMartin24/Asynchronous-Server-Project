require('custom-env').env(process.env.APP_ENV);
import mongoose from 'mongoose';
var User = require('../src/lib/models/userModel');
var Metric = require('../src/lib/models/metricModel');


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();

chai.use(chaiHttp);


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
            mongoose.connection.db.dropDatabase();
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
      let userLog;
      let metric;
      let user = {
                firstName: "hello",
                lastName: "world",
                email: "hello2@world.com",
                password: "azerty"
      }
      it('Post Register', (done) => {
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.user.email.should.be.eq(user.email);
                  res.body.data.user.lastName.should.be.eq(user.lastName);
                  res.body.data.user.firstName.should.be.eq(user.firstName);
              done();
            });
      });

      it('Post authenticate', (done) => {
        chai.request(server)
            .post('/api/user/authenticate')
            .send({ email: user.email, password: user.password })
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.data.token.should.not.be.a('undefined');
                  token = res.body.data.token;
              done();
            });
      });

      it('Access User data', (done) => {
        chai.request(server)
            .get('/api/profile')
            .set({ token: token })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.user.email.should.be.eq(user.email);
                res.body.data.user.lastName.should.be.eq(user.lastName);
                res.body.data.user.firstName.should.be.eq(user.firstName);
                userLog = res.body.data.user;
                done();
            })
        });
        it('Modify User data', (done) => {
          chai.request(server)
              .put('/api/user/update')
              .set({ token: token })
              .send({ email: "hello3@world.com", password: "@azerty"})
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.status.should.be.eq("success");
                  done();
              })
          });
        it('Add Metrics', (done) => {
          chai.request(server)
              .post('/api/profile/add-metric')
              .set({ token: token })
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.data.metrics.userId.should.be.eq(userLog._id);
                  done();
              })
          });

         it('Access Metrics data', (done) => {
            chai.request(server)
                .get('/api/profile/metrics')
                .set({ token: token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.metrics[0].userId.should.be.eq(userLog._id);
                    metric = res.body.data.metrics[0];
                    done();
                })
         });
         it('Update first Metric', (done) => {
            chai.request(server)
                .put('/api/profile/metric/update')
                .set({ token: token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.eq("success");
                    done();
                })
         });
         it('Update selected Metric', (done) => {
            chai.request(server)
                .put('/api/profile/metric/update/'+ metric._id)
                .set({ token: token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.eq("success");
                    done();
                })
         });
         it('Delete First Metric', (done) => {
            chai.request(server)
                .delete('/api/profile/metric/delete')
                .set({ token: token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.eq("success");
                    done();
                })
         });
         it('Delete selected Metric', (done) => {
            chai.request(server)
                .delete('/api/profile/metric/delete/'+ metric._id)
                .set({ token: token})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.eq("success");
                    done();
                })
         });
         it('Delete User', (done) => {
           chai.request(server)
             .delete('/api/user/delete')
             .set({ token: token })
             .send({ email: "hello@world.com"})
             .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eq("success");
                done();
            })
        });
        });

    });

export = {};
