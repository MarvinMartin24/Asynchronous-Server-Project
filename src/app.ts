import mongodb = require("./dbUtils")
import userdb = require("./user")

const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const port: string = process.env.PORT || '3000'

// Initiating Connection
mongodb.connect(function(err, db) {

    if (err) throw err;
    app.set('view engine','ejs');
    app.set('views', __dirname + "/view")

    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded())

    app.get('/', (req: any, res: any) => {
      res.render('hello.ejs')
    })

    app.get('/user/:first_name', (req: any, res: any) => {
      userdb.getUser(req.params.first_name, (err, user:userdb.User) => {
        if (user) {
          console.log(user)
          res.status(200).send(JSON.stringify(user))
          res.end()
        } else {
          res.status(404).json({error: 'not found'});
          res.end()

        }
      })
    });

    app.use((req: any, res: any) => {
      res.status(404).send('Error 404');
    });

    app.listen(port, (err: Error) => {
      if (err) {
        throw err
      }
      console.log(`server is listening on port ${port}`)
    })

});
