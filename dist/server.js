"use strict";
var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + "/../view");
app.get('/', function (req, res) {
    res.render('hello.ejs');
});
app.use(function (req, res) {
    res.status(404).send('Error 404');
});
app.listen(PORT, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + PORT);
});
