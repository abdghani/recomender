var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./bin/auth.js');
var routes = require('./routes/index');
var connectionString = auth.mongooseUrl;
var db = mongoose.connect(connectionString);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));/*
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit: 10000000000,
     limit: 1024 * 1024 * 10000000
}));*/

app.use(bodyParser.urlencoded({
        extended: true,
     parameterLimit: 10000000000,
     limit: 1024 * 1024 * 10
}));

app.use(bodyParser.json({
        extended: true,
     parameterLimit: 10000000000,
     limit: 1024 * 1024 * 10
}));
/*
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'bower_components')))
app.use('/', routes);
app.use('/api',require('./routes/api.js'));
app.use('/api/movies',require('./routes/movies.js'))
app.use('/api/imdb',require('./routes/imdb.js'))
app.use('/api/ratings',require('./routes/ratings.js'))
app.use('/admin',require('./routes/admin.js'));
app.use('https://www.google.com/', require('iproxy'))
app.use('*',function(req,res){
  res.json({
    error:"Invalid url",
    try:"/api"
  })
})

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

module.exports = app;
