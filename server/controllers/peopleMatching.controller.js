const User = require('mongoose').model('User');
const Habit = require('mongoose').model('Habit');
exports.findMatchedPeople = function(req, res, next){
    User.findById({ _id : req.body.userDetails.id }, 'habit' , function(err, user){
        if(err) res.json(err);
        if(user){
            Habit.findOne({ habit : user.habit }, 'match_type', function(err, habit){
                if(habit){
                    Promise.all([
                        User.find({ habit : { $in : habit.match_type.perfect }, _id : { $ne : req.body.userDetails.id }}),
                        User.find({ habit : { $in : habit.match_type.possible }}),
                        User.find({ habit : { $in : habit.match_type.least }})
                    ]).then( (perfectUser,possibleuser,leastUser) => {
                        res.json(perfectUser,possibleuser,leastUser);
                    })
                }
            })
        }
    })
}