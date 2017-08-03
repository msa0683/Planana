var passport = require('passport')
var db = require("../models")
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({where: {username:username}}).then(function (user, err) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy ({
  clientID: "750249591766521",
  clientSecret: "a8f565dffb327f944dfb8b5eeb965dea",
  callbackURL: "http://localhost:3000/fb-auth/return" 
}, function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.users.findById(id).then(function(user, err) {
    done(err, user);
  });
});





