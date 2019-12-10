const PORT = process.env.PORT || 3000;

var express = require("express");
var mongodb = require('mongodb');
var app = express();

var MongoClient = require('mongodb').MongoClient;




// Reuse database object in request handlers
app.get("/", function(req, res) {

    // Initialize connection once
    MongoClient.connect("mongodb://mongo:27017/app", (err, client) => {
        if(err) throw err;
        var db = client.db('app');
        var coll = db.collection('users');
        console.log('----- connected');
        coll.find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log(result);
                res.send(JSON.stringify(result));
            }
        })
    });
});


app.set('view engine','ejs');
app.set('views', __dirname + "/view")


// app.get('/', (req: any, res: any) => {
//   res.render('hello.ejs')
// })

app.use((req: any, res: any) => {
  res.status(404).send('Error 404');
});

app.listen(PORT, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${PORT}`)
})
