const user = require('../controllers/user.controller');
const jwt = require('express-jwt');
module.exports = function(app){
    const auth = jwt({
        secret: 'MY_SECRET',
        userProperty: 'payload'
    });
    app.post('/api/user/regis', user.register);
    app.post('/api/user/login', user.login);
    app.get('/api/user/login', auth, user.profileRead);
    app.post('/api/user/profile', user.profile);
    
}