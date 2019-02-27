var express = require("express");
var router = express.Router();

// Get Homepage
router.get('/', function(req,res, next){
    res.render('index', {title: 'INDEX'});
});

module.exports = router;