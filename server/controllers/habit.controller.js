const Habit = require('mongoose').model('Habit')

exports.saveHabit = function(req, res){
    const habit = new Habit(req.body);
    habit.save((err) => {
        if(err) console.log(err);
        res.json(habit);
    })
}