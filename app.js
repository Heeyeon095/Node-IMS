var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    name: 'ims-session',
    resave: false,
    saveUninitialized: false,
    secret: 'ims',
    cookie: {
      httpOnly: true,
      secure: false,
      /*
      maxAge : 만료 시간을 밀리초 단위로 설정
      expires : 만료 날짜를 GMT 시간으로 설정(maxAge와 동시 등록시 마지막것 사용)
      path : cookie의 경로 default “/“
      domain : 지정한 도메인으로 쿠키값을 저장한다.
      secure : https에서만 cookie 사용할 수 있도록 한다.(HTTPS여야만 작동)
      httpOnly : 웹서버를 통해서만 cookie 접근할 수 있도록 한다
      signed : cookie가 서명되어야 할 지를 결정한다.
      sameSite : true/false 엄격하게 같은 사이트에서 쿠키를 사용할지.
      */
    },
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
