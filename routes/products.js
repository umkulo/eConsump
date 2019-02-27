var express = require("express");
var router = express.Router();

// List Products
router.get('/list', function(req,res){
    res.render('products');
});

module.exports = router;