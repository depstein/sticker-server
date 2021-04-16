var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

// enabling CORS 
app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

app.use(logger('dev'));
app.use(express.json());
app.use(express.static('animations'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// page for sticker sharing
app.use('/sticker', function(req, res, next) {
  var stickerLink = String(req.originalUrl).substring(17);
  res.send("<html><head><meta content=\"Snapchat\" property=\"og:site_name\" /><meta content=\"Share your sticker!\" property=\"og:title\" /><meta content=\"" + stickerLink + "\" property=\"snapchat:sticker\" /></head><img src=\"" + stickerLink + "\"></html>");
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
  res.json({message: err.message, error: err });
});

module.exports = app;
