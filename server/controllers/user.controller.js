const User = require('mongoose').model('User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.register = function(req, res){
    const users  = new User({
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        username  : req.body.username,
        password  : req.body.password,
        email     : req.body.email
    });
    users.save((err) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              res.json({ success: false, message: 'Email หรือ Username นี้มีอยู่ในระบบแล้วกรูณาลองใหม่อีกครั้ง' });
              res.status(500);
              return;
            }
            return res.status(500).send(err);
        }
        res.json({
            success: true,
            message: 'การสมัครสมาชิกของท่านเสร็จสมบูรณ์'
          });
    });
}// Register

exports.login = function(req, res){

    passport.authenticate('local', function(err, user, info){
        var token;
    
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }
    
        // If a user is found
        if(user){
          token = user.generateJwt();
          const decode = jwt.verify(token, 'MY_SECRET')
          console.log(decode);
          res.status(200);
          res.json({
            success : true,
            message : "Loggin successfully",
            user : {
              id : user._id,
              email : user.email,
              username : user.username,
              firstname : user.firstname,
              lastname : user.lastname
            },
            token : token
          });

          
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res);
}

exports.profileRead = function(req, res) {
  console.log(req.payload);
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    User.findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};




