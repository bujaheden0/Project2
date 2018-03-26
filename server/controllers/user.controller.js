const User = require('mongoose').model('User');
const Dorm = require('mongoose').model('Dorm');
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
    provider: "local"
  });
  const userDataforOtp = {
    username: req.body.username,
    password: req.body.password,
    tel: req.body.tel
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
        verify: user.verify,
        profile_status: user.profile_status,
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


    } else if (user && !user.verify) {
      res.json({
        success: false,
        userFound: true,
        verify: user.verify,
        message: "ท่านยังไม่ได้ทำการยืนยันตัวตน กรุณายืนยันตัวตนให้เสร็จเรียบร้อย",
      })
      userData = {
        username: user.username,
        password: req.body.password,
        tel: user.tel
      }
      sendOtp.keepUserData(userData)
    } else {
      res.json({
        success: false,
        userFound: false,
        message: "Username หรือ Password ไม่ถูกต้องหรือไม่มีในระบบกรุณาลองใหม่อีกครั้ง"
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
exports.testprofile = function(req, res){
  User.update({ _id: req.body.userDetails.id }, {
    $set: {
      habit: req.body.habit.habit,
    }
  }, function (err, user) {
    if (err) res.send(err);
    res.send(user);
  });
}
exports.UpdateProfiles = function (req, res) {
  var data = JSON.parse(req.body.data);
  if(req.files != ""){
  var path = req.files[0].path.split("\\");
  path = "../../" + path[1] + "/" + path[2] + "/" +path[3];
  console.log(path);
  } else {
    path = data.profile_picture;
    console.log(path);
  }
  User.update({ _id: data.userDetails.id }, {
    $set: {
      'profile_picture' : path,
      'details.religion': data.religion,
      'details.gender': data.gender,
      'details.birthDate': data.birthday,
      'details.facebook': data.facebook,
      'details.occupation': data.occupation,
      'details.sleep_time': data.sleep_time,
      'details.hobbies': data.hobbies,
      'details.address': data.address,
      'details.descriptions': data.descriptions,
      'details.price.min': data.minPrice,
      'details.price.max': data.maxPrice,
      'details.r_status': data.r_status,
      'details.g_status': data.g_status,
      'details.b_range': data.b_status,
      'details.b_range': data.b_range,
      'tel': data.tel,
      'profile_status': data.profile_status,
      'details.descriptionsEx.c1': data.descriptions1,
      'details.descriptionsEx.c2': data.descriptions2,
      'details.descriptionsEx.c3': data.descriptions3,
      'details.descriptionsEx.c4': data.descriptions4,
      'details.descriptionsEx.c5': data.descriptions5,
    }
  }, function (err, user) {
    if (err) res.send(err);
    res.send(user);
  });
}

exports.UpdateHabit = function (req, res) {
  console.log('dfd');
  User.update({ _id: req.body.userDetails.id }, {
    $set: {
      habit: req.body.habit,
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

exports.settingProfile = function (req, res) {
  User.findOne({ _id: req.body.userDetails.id }, function (err, user) {
    if (err) throw (err);
    if (user) {
      res.status(200);
      res.json(user);
    }
  });
}

// exports.settingProfile = function (req, res) {
//   User.findOne({ _id: req.body.userDetails.id }, function (err, user) {
//     if (err) throw (err);
//     if (user) {
//       res.status(200);
//       res.json({
//         success: true,
//         message: "Loggin successfully",
//         user: {
//           id: user._id,
//           username: user.username,
//           descriptions: user.details.descriptions,
//           religion: user.details.religion,
//           gender: user.details.gender,
//           birthday: user.details.birthDate,
//           facebook: user.details.facebook,
//           occupation: user.details.occupation,
//           sleep_time: user.details.sleep_time,
//           hobbies: user.details.hobbies,
//           address: user.details.address,
//           descriptions: user.details.descriptions,
//           minPrice: user.details.price.min,
//           maxPrice: user.details.price.max,
//           r_status: user.details.r_status,
//           g_status: user.details.g_status,
//           b_status: user.details.b_range,
//           b_range: user.details.b_range,
//           tel: user.tel,
//           profile_status: user.profile_status,
//           habit: user.habit,
//           // descriptions1: user.details.descriptionsEx.c1,
//           // descriptions2: user.details.descriptionsEx.c2,
//           // descriptions3: user.details.descriptionsEx.c3,
//           // descriptions4: user.details.descriptionsEx.c4,
//           // descriptions5: user.details.descriptionsEx.c5,//สเตมบายรอดาต้าเยสพร้อม
//         }
//       });
//     }
//   });
// }
exports.GetDorm = function (req, res) {
  console.log(req.body);
  Dorm.find( function (err, dorm) {
    if (err) throw (err);
    if (dorm) {
      res.status(200);
      res.json(dorm);
    }
  });
}
