const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) {  return done(err);}
            if (!user) { return done(null,false, { message : 'Cannot find Username'}); }
            if (!user.verifyPassword(password, user.password)) { return done(null, false, {
              message : "password is incorrect" }); }
            return done(null, user);
          });
        }
      ));
}