const Matching = require('mongoose').model('Matching');
const Notification = require('mongoose').model('Notification');

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
        const notification = await Notification.find({ reciever : req.body.id}).populate('sender');
        res.json(notification);
    } catch(error){
        console.error(error.message);
    }
    
}