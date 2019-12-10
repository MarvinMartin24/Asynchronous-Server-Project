const PORT = process.env.PORT || 3000;

var express = require("express");
var mongodb = require('mongodb');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var db;

// // Initialize connection once
// MongoClient.connect("mongodb://localhost:27017/App", function(err, database) {
//   if(err) throw err;
//   db = database;
// });
//
//
// // Reuse database object in request handlers
// app.get("/", function(req, res) {
//   db.collection("User").find({}, function(err, docs) {
//     docs.each(function(err, doc) {
//       if(doc) {
//         console.log(doc);
//       }
//       else {
//         res.end();
//       }
//     });
//   });
// });


app.set('view engine','ejs');
app.set('views', __dirname + "/view")


app.get('/', (req: any, res: any) => {
  res.render('hello.ejs')
})

app.use((req: any, res: any) => {
  res.status(404).send('Error 404');
});

app.listen(PORT, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${PORT}`)
})
