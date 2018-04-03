const matching = require('../controllers/matching.controller');

module.exports = function(app){
    app.post('/api/notifications/find', matching.findMessageFromMatching);
}