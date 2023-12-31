require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require("passport")
const {loginGoogleInitialize} = require("./services/googleServices")


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');


const { use } = require("passport");
const validateSession = require("./middlewares/validateSession")

const app = express();
loginGoogleInitialize()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')))
    .use(session({
      secret : "notepad",
      resave: false,
      saveUninitialized: true
    }))
    .use(passport.initialize())
    .use(passport.session())
    
    .use(validateSession)
   .use(methodOverride('_method'));
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/user', notesRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {ee
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
