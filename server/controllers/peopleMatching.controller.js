const User = require('mongoose').model('User');
const Habit = require('mongoose').model('Habit');
const Reserve = require('mongoose').model('Reserve');
exports.findMatchedPeople = async function(req, res, next){
    try {
    const user        = await User.findById(req.body.userDetails.id);
    const habit       = await Habit.findOne({ habit : user.habit }, 'match_type');
    const [perfectUser,possibleUser,leastUser] = await  Promise.all([
        User.find({ habit : { $in : habit.match_type.perfect }, 
                    _id : { $ne : req.body.userDetails.id },
                    'details.price.min' : {
                        $gte : user.details.price.min
                    },
                    'details.price.max' : {
                        $lte : user.details.price.max
                    }
        }),
        User.find({ habit : { $in : habit.match_type.possible },
                    _id : { $ne : req.body.userDetails.id },
                    'details.price.min' : {
                        $gte : user.details.price.min
                    },
                    'details.price.max' : {
                        $lte : user.details.price.max
                    }
        }),
        User.find({ habit : { $in : habit.match_type.least },
                    _id : { $ne : req.body.userDetails.id },
                    'details.price.min' : {
                        $gte : user.details.price.min
                    },
                    'details.price.max' : {
                        $lte : user.details.price.max
                    }
        })
    ])
    // const perfectUserMap  =  perfectUser.map(x => x._id);
    // const possibleUserMap =  possibleUser.map(x => x._id);
    // const leastUserMap    =  leastUser.map(x => x._id);
    // const [perfectUser_hadDorm,possibleUser_hadDorm,leastUser_hadDorm] = await Promise.all([
    //     Reserve.find({ user : { $in : perfectUserMap }}).populate('user').populate('dorm'),
    //     Reserve.find({ user : { $in : possibleUserMap }}).populate('user').populate('dorm'),
    //     Reserve.find({ user : { $in : leastUserMap }}).populate('user').populate('dorm')
    // ])
    res.json([perfectUser,possibleUser,leastUser]);
    } catch(error){
        console.error(error.message);
    }
}

exports.findMatchedPeople_hadDorm = async function(req,res){
    try {
    const perfectUser  =  req.body.perfectUser.map(x => x._id);
    const possibleUser =  req.body.possibleUser.map(x => x._id);
    const leastUser    =  req.body.leastUser.map(x => x._id);
    const [perfectUser_hadDorm,possibleUser_hadDorm,leastUser_hadDorm] = await Promise.all([
        Reserve.find({ user : { $in : perfectUser }}).populate('user').populate('dorm'),
        Reserve.find({ user : { $in : possibleUser }}).populate('user').populate('dorm'),
        Reserve.find({ user : { $in : leastUser }}).populate('user').populate('dorm')
    ])
    res.json([perfectUser_hadDorm,possibleUser_hadDorm,leastUser_hadDorm]);
    } catch(error){
        console.error(error.message)
    }    
}

exports.create_Reserve = function(req,res){
    const data = new Reserve({
        user : req.body.user,
        dorm : req.body.dorm
    })

    data.save(function(err){
        if(err) console.log(err)
        else res.json(data);
    })
}
