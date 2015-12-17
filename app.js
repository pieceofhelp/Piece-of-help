require('./db'); // connct to our DB

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var partials = require('express-partials');
var routes  = require( './routes' );
var user  = require( './routes/user' );
var item  = require( './routes/item' );
// var flash = require('connect-flash');

// require('./config/passport'); // TODO [FB] : Passport configuration

var app = express();
// var Vote = mongoose.model('Vote'); // TODO [DB] : Get Vote model

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/public/html'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser("heyheyhey u can't guess my cookie key!"));
app.use(express.cookieSession());

// https://github.com/jaredhanson/passport#middleware
// app.use(passport.initialize());
// app.use(passport.session());
// // Session based flash messages
// app.use(flash());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Routes
app.get('/', routes.index);
app.get('/home',routes.home);
app.get('/supply/:id',routes.supply);
app.get('/need/:id',routes.need);
app.post('/create',routes.create);
app.get('/upload', routes.upload);
app.post('/uploadsupply', routes.uploadsupply);
app.post('/uploadneed', routes.uploadneed);
app.post('/login', routes.login);
app.get('/item/:charity/:id',item.item);
app.post('/deal',item.deal);
app.get( '/destroy/:id', item.destroy );

app.get('/user', user.index);
app.post('/user', user.create);
app.post('/user/login', user.login);
app.get('/user/logout', user.logout);
app.get('/profile/:id', user.profile);

app.post('/donate', user.donate);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
