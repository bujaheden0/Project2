const PeopleMatching = require('../controllers/peopleMatching.controller');

module.exports = function(app){
    app.post('/api/user/match', PeopleMatching.findMatchedPeople)
}