const habit = require('../controllers/habit.controller');

module.exports = function(app){
    app.post('/api/habit', habit.saveHabit)
}