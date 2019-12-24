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


export = router;
