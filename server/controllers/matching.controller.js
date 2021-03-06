const Matching = require('mongoose').model('Matching');
const Notification = require('mongoose').model('Notification');
const User = require('mongoose').model('User');

exports.addInterestedPeople = function(req,res){
    console.log(req.body);
    const matching = new Matching({
        actioner : req.body.actioner,
        victim   : req.body.victim,
        status   : req.body.status
    })

    matching.save((err) => {
    if(err) console.log(err);
     const notification = new Notification({
           sender : req.body.actioner,
           reciever : req.body.victim,
           message : "ต้องการติดต่อคุณ",
           type : 1,
           read : false
    })
        notification.save((err) => {
        if(err) console.log(err);
        res.json(notification);
        })
    })
}

exports.findMessageFromMatching = async function(req,res){
    console.log(req.body);
    try {
        const notification = await Notification.find({ reciever : req.body.id }).populate('sender');
        res.json(notification);
    } catch(error){
        console.error(error.message);
    }
    
}

exports.getInterestedPeopleInformation = function(req,res){
    User.findById({ _id : req.body.id}, function(err, user){
        if(err) console.log(err);
        if(user){
            res.json(user);
        }
    })
}

exports.updateReadNotification = function(req,res){
    Notification.update({ _id : req.body.messageId },{
        $set : {
            read : true
        }
    }, function(err, notification){
        if(err) console.log(err);

        res.json(notification);
    })
}

exports.updateMatchingStatus_Agree = function(req,res){
    console.log(req.body);
    Matching.update({ actioner : req.body.actionId , victim : req.body.victim.id },{
        $set : {
            status : "Matched"
        }
    }, function(err, matching){
        if(err) console.log(err)
        
        if(matching){
            const notification = new Notification({
                sender : req.body.victim.id,
                reciever : req.body.actionId,
                message : "ตอบรับคำขอของคุณแล้ว",
                type: 2,
                read : false
            })

            notification.save((err) => {
                if(err) console.log(err)
                res.json(notification);
            })
        }
    })
}

exports.updateMatchingStatus_Reject = function(req,res){
    console.log(req.body);
    Matching.update({ actioner : req.body.actionId , victim : req.body.victim.id },{
        $set : {
            status : "Cancelled"
        }
    }, function(err, matching){
        if(err) console.log(err)
        console.log(matching);
        res.json(matching);
    })
}

exports.findMatchedPeopleInfo = async function(req, res){
    try{
        const userInfo = await User.find({ _id : req.body.actionerId});
        res.json([userInfo]);
    } catch(error){
        console.error(error.message);
    }
}

exports.check_ifIsMatching = function(req,res){
    Matching.find({ actioner : req.body.actioner, victim : req.body.victim }, function(err, data){
        if(err) console.log(err);
        if(data){ res.json(data);}
        else {
            res.json({
                message : "Cannot find data"
            })
        }
    })
}

exports.updateUserStatus_Matched = function(req,res){
    User.update({ _id : req.body.actionId },{
        $set : {
            matchedStatus : true
        }
    },function(err, update){
        if(err)console.log(err)
    })

    User.update({ _id : req.body.victim.id },{
        $set : {
            matchedStatus : true
        }
    },function(err, update1){
        if(err)console.log(err)
        if(update1) res.json(update1);
    })
}

exports.getRoommate_id = async function(req,res){
    try{
    const userMatch =  await Matching.find({ $or :[{ actioner : req.body.id},{ victim : req.body.id}] }).populate('actioner').populate('victim');
    res.json([userMatch]);
    } catch(err){
        console.log(err);
    };
}

exports.getRoommateInformation = function(req,res){
    User.findById({ _id : req.body.id},function(err,roommateInfo){
        if(err) console.log(err);
        res.json(roommateInfo);
    })
}