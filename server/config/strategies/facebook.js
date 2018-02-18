const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const user = require('../../controllers/user.controller');
const config = require('../env/development');


module.exports = function(){
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackUrl,
        profileFields: ['id', 'email', 'name'],
        passReqToCallback: true
      },
      function(req,accessToken, refreshToken, profile, done) {
        const providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        const providerUserProfile = {
          firstname : profile.name.givenName,
          lastname  : profile.name.familyName,
          email : profile.emails[0].value,
          username : profile.username,
          provider : 'facebook',
          providerId : profile.id,
          providerData: providerData
        };
       
        user.saveOAuthUserProfile(req, providerUserProfile, done)
       
      }));
}