const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator= require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Sequelize = require('sequelize');
// const mongo = require('mongodb');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/loginapp');
// const db = mongoose.connection;

const routes = require('./routes/index');
const users = require('./routes/users');
const products = require('./routes/products');

const sequelize = new Sequelize('icanstore', 'root', 'Mast3rk3y', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

//   sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });  

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout:'layout', extname: '.hbs'}));
app.set('view engine','.hbs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Set Statis Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split(','),
        root = namespace.shift(),
        formParam = root;
        
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash());

//Global Vars for Flash
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Middleware for Route files
app.use('/', routes);
app.use('/users', users);
app.use('/products', products);

app.set('port', (process.env.Port || 3000));
    
app.listen(app.get('port'), process.env.IP, function(){
    console.log('Express server started sucessfully : '+app.get('port'));
});