const User = require('mongoose').model('User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const sendOtp = require('./verify.controller');

exports.register = function (req, res) {
  const users = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    tel: req.body.tel,
    provider : "local"
  });
  const userDataforOtp = {
    username : req.body.username,
    password : req.body.password,
    tel      : req.body.tel
  }
  users.save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.json({ success: false, message: 'Email , Username หรือ เบอร์โทรศัพท์ นี้มีอยู่ในระบบแล้วกรูณาลองใหม่อีกครั้ง' });
        res.status(500);
        return;
      }
      return res.status(500).send(err);
    }
    res.json({
      success: true,
      message: 'การสมัครสมาชิกของท่านเสร็จสมบูรณ์'
    });
    sendOtp.keepUserData(userDataforOtp);
  });
  
}// Register

exports.login = function (req, res) {
  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user && user.verify) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        success: true,
        verify : user.verify,
        profile_status : user.profile_status,
        message: "๊Username และ Password ถูกต้องเรากำลังพาท่านเข้าสู่ระบบ",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname
        },
        token: token
      });


    } else if(user && !user.verify) {
        res.json({
          success : false,
          userFound : true,
          verify : user.verify,
          message : "ท่านยังไม่ได้ทำการยืนยันตัวตน กรุณายืนยันตัวตนให้เสร็จเรียบร้อย",
        })
        userData = {
          username : user.username,
          password : req.body.password,
          tel      : user.tel
        }
        sendOtp.keepUserData(userData)
    } else {
      res.json({
        success : false,
        userFound : false,
        message : "Username หรือ Password ไม่ถูกต้องหรือไม่มีในระบบกรุณาลองใหม่อีกครั้ง"
      })
    }
  })(req, res);
}

exports.getProfile = function (req, res) {
  console.log(req.body);
  User.findOne({ _id: req.body.userId }, function (err, user) {
    if (err) throw (err);
    if (user) {
      res.status(200);
      res.json({
        success: true,
        message: "Loggin successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname
        }
      });
    }
  })
}

exports.profileRead = function (req, res) {
  console.log(req.payload);
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {

    User.findById(req.payload._id)
      .exec(function (err, user) {
        res.status(200).json(user);
      });
  }

};

exports.saveOAuthUserProfile = function (req, profile, done) {
  User.findOne({
    provider: profile.provider,
    providerId: profile.providerId
  }, function (err, user) {
    if (err) return done(err);
    else {
      if (!user) {
        const possibleUsername = profile.username
          || (profile.email ? profile.email.split('@')[0] : '');
        User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
          profile.username = availableUsername;
          user = new User(profile);
          user.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(err, user);
          })
        }) // findUniqueUsername

      } else {

        return done(err, user);
      }
    }
  });
}

exports.UpdateProfiles = function (req, res) {
  User.update({ _id: req.body.userDetails.id }, {
    $set: {
      'details.religion': req.body.religion,
      'details.gender': req.body.gender,
      'details.birthDate': req.body.birthday,
      'details.facebook': req.body.facebook,
      'details.tel': req.body.tel,
      'details.occupation': req.body.occupation,
      'details.sleep_time': req.body.sleep_time,
      'details.hobbies': req.body.hobbies,
      'details.address': req.body.address,
      'details.descriptions': req.body.descriptions,
      'details.price.min': req.body.minPrice,
      'details.price.max': req.body.maxPrice,
      'details.r_status': req.body.r_status,
      'details.g_status': req.body.g_status,
      'details.b_range': req.body.b_status,
      'details.b_range': req.body.b_range,
      'profile_status': req.body.profile_status,
    }
  }, function (err, user) {
    if (err) res.send(err);
    res.send(user);
  });
}
exports.showProfile = function (req, res) {
  // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
  console.log('11-21-25');
  User.findOne({ firstname: 'Ragxush' }, function (err, user) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    res.send(user);
  });
}


