const PeopleMatching = require('../controllers/peopleMatching.controller');

module.exports = function(app){
    app.post('/api/user/match', PeopleMatching.findMatchedPeople);
    app.post('/api/user/match/dorm', PeopleMatching.findMatchedPeople_hadDorm);
    app.post('/api/post/reserve', PeopleMatching.create_Reserve);
}