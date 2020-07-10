var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var morgan = require('morgan');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var dotenv = require('dotenv');
var routes = require('./src/routes');


// custom cors
var CORS = require('./src/utils/CORS');
const { collection } = require('./src/Models/Tamu');


var app = express();

dotenv.config();

// set cors header
app.use(CORS);

// set connection database

// conection to database
mongoose
   .connect('mongodb://localhost/tamu', {
      useUnifiedTopology: true,
      useNewUrlParser: true
   })
   .then(() => console.log(`database connected`));

// error message if connection failed
mongoose.connection.on('error', err => {
   console.log(`error connection ${err.message}`);
});

mongoose.set("debug", (collectionName, method, query, doc) => {
   console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);

})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// history url
app.use(morgan('dev'));

// parsing request json  to json
app.use(bodyParser.json());

// use validation for validation field
app.use(expressValidator());

mongoose.Promise = global.Promise;

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render('error');
});

module.exports = app;