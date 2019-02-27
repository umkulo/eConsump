var express = require("express");
var router = express.Router();

// Register
router.get('/register', function(req,res){
    res.render('register');
});

// Login
router.get('/login', function(req,res){
    res.render('login');
});

// Logout
router.get('/logout', function(req,res){
    res.render('/');
});

module.exports = router;