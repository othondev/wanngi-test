const User = require('../database/schemas/UserSchema')
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {usernameField:"login", passwordField:"password"},
  function(login, password, done) {
    User.findOne({ login }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;