const User = require('mongoose').model('User');


exports.register = function(req, res){
    const users  = new User({
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        username  : req.body.username,
        password  : req.body.password,
        email     : req.body.email,
        details : {
            religion : req.body.religion
        }
    });

    users.save((err) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              return res.json({ success: false, message: 'User already exist!' });
            }

            return res.status(500).send(err);
        }

        res.json({
            success: true
          });
    });

}



