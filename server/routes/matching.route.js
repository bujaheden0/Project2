const matching = require('../controllers/matching.controller');

module.exports = function(app){
    app.post('/api/match/add', matching.addInterestedPeople);
    app.post('/api/match/getInfo', matching.getInterestedPeopleInformation);
    app.post('/api/match/agree', matching.updateMatchingStatus_Agree);
    app.post('/api/match/reject', matching.updateMatchingStatus_Reject);
    app.post('/api/match/find', matching.findMatchedPeopleInfo);
    app.post('/api/match/check', matching.check_ifIsMatching);
    app.post('/api/match/setUserStatus', matching.updateUserStatus_Matched);
    app.post('/api/match/getRoommate', matching.getRoommate_id);
    app.post('/api/match/getRoommateInfo', matching.getRoommateInformation);
}