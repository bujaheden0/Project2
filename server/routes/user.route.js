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
    
    app.get('/api/oauth/facebook', passport.authenticate('facebook'));
    app.post('/api/user/detail', user.getProfile);
    // app.get('/api/oauth/facebook/callback',
    // passport.authenticate('facebook', {
    //     successRedirect : '/',
    //     failureRedirect : '/signin'
    // }, function(req,res){
    //     res.json({success: true, mse: "COMPLETED"});
    // }));

    app.get('/api/oauth/facebook/callback', (req, res, next) => {
        passport.authenticate('facebook', (err,user) => {
            if(user){
                token = user.generateJwt();
            }
            res.redirect('/passport/' + token +"/" + user._id);
        })(req, res, next);
    });

    // app.get('/api/oauth/facebook/callback',
    //     passport.authenticate('facebook', { failureRedirect: '/signin' }),
    //         function(req, res, user) {
    //         res.redirect('/passport/' +  + '/' +  req.providerData.accessToken.userId);
    //     });
}