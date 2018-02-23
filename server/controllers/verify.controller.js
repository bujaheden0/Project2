const User = require('mongoose').model('User');
const config = require('../config/env/development');
const UserController = require('./user.controller');
const Nexmo = require('../config/verify');
const nexmo = Nexmo.nexmo;

function randomOtpNumber(){
  const randomOtp = Math.floor(Math.random() * 8999) + 1000;
  return randomOtp;
}

exports.keepUserData = function (user){
  userData = user;
}

exports.sendOtpMessage = function(req, res){
    userData = this.userData;
    console.log(userData);
    username = userData.username;
    password = userData.password;
    telephoneNumber = userData.tel;
    otpNumber = randomOtpNumber();
    //send SMS OTP
    nexmo.message.sendSms(
      config.nexmo.apiNumber, telephoneNumber, otpNumber, {type: 'unicode'},
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        res.json({
          success : true,
          message : "ส่งรหัสผ่าน OTP ให้ท่านเรียบร้อยกรุณาตรวจสอบข้อความทางโทรศัพท์"
        })
      }
    }
  );
}

exports.compareOtpNumber = function (req,res){
  const otpFromUser = req.body.userOtp;
  const data = {
    username : this.username,
    password : this.password
  }
  if(otpFromUser){
  if(otpFromUser == this.otpNumber){
    User.update({ username : data.username }, { $set : { verify : true }}, 
      (err ,user) => {
        if(err) console.log(err);
        if(user){
          res.json({
            success : true,
            message : "รหัสผ่านถูกต้องการยืนยันตัวตนเสร็จสมบูรณ์",
            data : data
          });
        }
    })
  }else {
    res.json({
      success : false,
      message : "รหัสผ่านไม่ถูกต้องกรุณาลองใหม่อีกครั้ง"
    })
    res.status(500)
  }
} else {
  res.json({
    success : false,
    message : "ท่านกรอกรหัสผ่านไม่ครบ กรุณากรอกรหัสผ่านให้ครบด้วย"
  })
}
}

