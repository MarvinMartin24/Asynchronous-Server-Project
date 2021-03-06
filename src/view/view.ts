const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.redirect('/login')
});

router.get('/login', (req, res) => {
    res.render(path.join(__dirname + '/login/', 'login.ejs'));
});

router.get('/signup', (req, res) => {
    res.render(path.join(__dirname + '/signup/', 'signup.ejs'));
});

router.get('/me', (req, res) => {
    res.render(path.join(__dirname + '/profile/', 'profile.ejs'));
});

router.get('/me/modify', (req, res) => {
    res.render(path.join(__dirname + '/modify/', 'modify.ejs'));
});

router.get('/me/metrics', (req, res) => {
    res.render(path.join(__dirname + '/metrics/', 'metrics.ejs'));
});

export = router;
