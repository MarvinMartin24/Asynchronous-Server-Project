const PORT = process.env.PORT || 3000;

var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.set('view engine','ejs');
app.set('views', __dirname + "/../view")

MongoClient.connect("mongodb://localhost:27017/Projet", function(error, db) {
    //Connection to the database
    if (error) console.log("error");
    console.log("Connecté à la base de données 'Projet'");

    //Printing all the docs of the collection in the console
    var cursor = db.collection('users').find();
    cursor.each(function(err, doc) {
        console.log(doc);
    });
 });

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
