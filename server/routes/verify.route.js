const verify = require('../controllers/verify.controller');

module.exports = function(app){
    app.post('/api/user/verifyOtp', verify.compareOtpNumber);
    app.get('/api/user/getOtp', verify.sendOtpMessage);
}