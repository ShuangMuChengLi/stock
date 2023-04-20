var createError = require('http-errors');
var express = require('express');
var path = require('path');
let open = require("open");
let cors = require("cors");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
console.log(process.env.VUE_APP_NO_PROXY);
var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('E:\\main\\2.0\\dist'));
// app.use(express.static(path.resolve(__dirname, 'dist')));

app.use('/data', indexRouter);
app.use("/v5",function (req,res, next) {
  proxy.web(req, res, {
    target: 'https://stock.xueqiu.com/v5',
    changeOrigin: true
  });
  proxy.on('error', function(e) {
    next(e);
  });
});
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
