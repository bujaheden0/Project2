const matching = require('../controllers/matching.controller');

module.exports = function(app){
    app.post('/api/match/add', matching.addInterestedPeople);
}