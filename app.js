var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var bodyParser = require("body-parser");
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testsRouter = require('./routes/tests');
var preguntasRouter = require('./routes/preguntas');
var progresoRouter = require('./routes/progreso');

var mongoose = require('mongoose');
mongoose.set('strictQuery', false); //requerido para quitar el warning
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
    .then(() => console.log('Conexión a MongoDB Atlas establecida'))
    .catch((err) => console.error('Error al conectar a MongoDB Atlas:', err));
mongoose.connection;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tests', testsRouter);
app.use('/preguntas', preguntasRouter);
app.use('/progreso', progresoRouter);


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
  //res.render('error');
  res.json({ message: err.message, error: err });
});

module.exports = app;
