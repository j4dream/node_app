
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var User = require('./models/user');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var mongo = require('./lib/mongodb');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var partials = require('express-partials');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('./middlewares/auth');

mongo.connect();
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine('.html', require('ejs').renderFile);  
app.set('view engine', 'html'); 
app.use(express.static(path.join(__dirname, 'static')));
app.use(partials());
app.use(bodyParser()); 
app.use(cookieParser()); 
app.use(session({ secret: "j4dream blog"})); 
app.use(passport.initialize());
app.use(passport.session());
app.use(auth.authUser);
app.use(flash());

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email}, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

routes.init(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
