module.exports = function(app){
    const user = require('../controllers/user.controller');

    app.route('/api/user')
       .post(user.register)
}