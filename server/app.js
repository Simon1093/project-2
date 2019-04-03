const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newsRouter = require('./routes/news');
const mongodb = require('./db/mongodb');

const app = express();
const expressValidator = require('express-validator');

require('./passport');
app.use(passport.initialize());

app.use(expressValidator())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/profile', usersRouter);
app.use('/news', newsRouter);
app.use('/users', usersRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
