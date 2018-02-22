const User = require('mongoose').model('User');
const config = require('../config/env/development');
const UserController = require('./user.controller');
const Nexmo = require('../config/verify');
const nexmo = Nexmo.nexmo;

function randomOtpNumber(){
  const randomOtp = Math.floor(Math.random() * 8999) + 1000;
  return randomOtp;
}

exports.sendOtpMessage = function(req, res){
    username  = req.username;
    password  = req.password;
    console.log(req);
    console.log(username);
    console.log(password);
    telephoneNumber = req.tel;
    telephoneNumber = telephoneNumber.slice(1,10);
    telephoneNumber = "66" + telephoneNumber;
    otpNumber = randomOtpNumber();
    nexmo.message.sendSms(
      config.nexmo.apiNumber, telephoneNumber, otpNumber, {type: 'unicode'},
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
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
            message : "Completed",
            data : data
          });
        }
    })
  }else {
    res.json({
      success : false,
      message : "Otp is not matched"
    })
    res.status(500)
  }
} else {
  res.json({
    success : false,
    message : "No OTP From user"
  })
}
}