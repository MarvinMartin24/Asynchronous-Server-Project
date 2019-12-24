"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
router.get('/', function (req, res) {
    res.redirect('/login');
});
router.get('/login', function (req, res) {
    res.render(path.join(__dirname + '/login/', 'login.ejs'));
});
router.get('/signup', function (req, res) {
    res.render(path.join(__dirname + '/signup/', 'signup.ejs'));
});
router.get('/me', function (req, res) {
    res.render(path.join(__dirname + '/profile/', 'profile.ejs'));
});
router.get('/me/metrics', function (req, res) {
    res.render(path.join(__dirname + '/metrics/', 'metrics.ejs'));
});
module.exports = router;
