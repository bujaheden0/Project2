const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../../controllers/user.controller');
const config = require('../env/development');


module.exports = function(){
    passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl,
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
          provider : 'google',
          providerId : profile.id,
          providerData: providerData
        };
       
        user.saveOAuthUserProfile(req, providerUserProfile, done)
       
      }));
}