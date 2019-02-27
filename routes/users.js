var express = require("express");
var router = express.Router();

// Register
router.get('/register', function(req,res){
    res.render('register', {title: 'REGISTER'});
});

// Login
router.get('/login', function(req,res){
    res.render('login', {title: 'USER LOGIN'});
});

// Logout
router.get('/logout', function(req,res){
    res.render('/', {title: 'INDEX'});
});

module.exports = router;