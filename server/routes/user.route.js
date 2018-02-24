const user = require('../controllers/user.controller');
const jwt = require('express-jwt');
const passport = require('passport');
<<<<<<< HEAD
module.exports = function (app) {
=======
const config = require('../config/env/development');
const Nexmo = require('../config/verify');

nexmo = Nexmo.nexmo;
module.exports = function(app){
>>>>>>> 8592e9ae464423d9bd212e192ae27c53358e4a61
    const auth = jwt({
        secret: 'MY_SECRET',
        userProperty: 'payload'
    });
    app.post('/api/user/regis', user.register);
    app.post('/api/user/login', user.login);
    app.get('/api/user/login', auth, user.profileRead);
    app.post('/api/user/profile', user.UpdateProfiles);
    app.get('/api/user/showProfile', user.showProfile);

    app.get('/api/oauth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
    app.get('/api/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/api/oauth/google/callback', (req, res, next) => {
        passport.authenticate('google', (err, user) => {
            if (user) {
                token = user.generateJwt();
                res.redirect('/passport/' + token + "/" + user._id);
            }

        })(req, res, next);
    });
    app.post('/api/user/detail', user.getProfile);
    app.get('/api/oauth/facebook/callback', (req, res, next) => {
        passport.authenticate('facebook', (err, user) => {
            if (user) {
                token = user.generateJwt();
                res.redirect('/passport/' + token + "/" + user._id);
            }

        })(req, res, next);
    });

    
    app.get('/api/send/otp', (req, res) => {
        nexmo.message.sendSms(
            config.nexmo.apiNumber, '66902599621', 1111, {type: 'unicode'},
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              console.dir(responseData);
              // Optional: add socket.io -- will explain later
              res.json({
                  success : true,
                  message : "COMPLETED"
              })
            }
          }
        );
       });

    

}