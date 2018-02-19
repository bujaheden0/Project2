const user = require('../controllers/user.controller');
const jwt = require('express-jwt');
const passport = require('passport');
module.exports = function(app){
    const auth = jwt({
        secret: 'MY_SECRET',
        userProperty: 'payload'
    });
    app.post('/api/user/regis', user.register);
    app.post('/api/user/login', user.login);
    app.get('/api/user/login', auth, user.profileRead);
    app.post('/api/user/profile',user.UpdateProfiles);
    
    app.get('/api/oauth/facebook', passport.authenticate('facebook' ,{ scope : ['public_profile', 'email'] }));
    app.get('/api/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/api/oauth/google/callback', (req, res, next) => {
        passport.authenticate('google', (err,user) => {
            if(user){
                token = user.generateJwt();
                res.redirect('/passport/' + token +"/" + user._id);
            }
            
        })(req, res, next);
    });
    app.post('/api/user/detail', user.getProfile);
    app.get('/api/oauth/facebook/callback', (req, res, next) => {
        passport.authenticate('facebook', (err,user) => {
            if(user){
                token = user.generateJwt();
                res.redirect('/passport/' + token +"/" + user._id);
            }
            
        })(req, res, next);
    });

}