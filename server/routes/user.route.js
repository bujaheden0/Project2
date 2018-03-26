const user = require('../controllers/user.controller');
const jwt = require('express-jwt');
const passport = require('passport');
const config = require('../config/env/development');
const Nexmo = require('../config/verify');
const multer = require('multer');
const path = require('path');
//const upload = multer({ dest:'uploads/'});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/assets/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })
nexmo = Nexmo.nexmo;
module.exports = function(app){
    const auth = jwt({
        secret: 'MY_SECRET',
        userProperty: 'payload'
    });
    app.post('/api/user/regis', user.register);
    app.post('/api/user/login', user.login);
    app.get('/api/user/login', auth, user.profileRead);
    app.post('/api/user/habit',user.UpdateHabit);
    app.get('/api/user/dorm',user.GetDorm);
    
    app.get('/api/oauth/facebook', passport.authenticate('facebook' ,{ scope : ['public_profile', 'email'] }));
    app.post('/api/user/profile',upload.array('uploads'), user.UpdateProfiles);
    app.get('/api/user/showProfile', user.showProfile);
    app.post('/api/user/settingProfile', user.settingProfile);
    app.post('/api/user/testprofile', user.testprofile);

    app.get('/api/oauth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
    app.get('/api/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/api/oauth/google/callback', (req, res, next) => {
        passport.authenticate('google', (err, user) => {
            if(err) {
                res.json({
                    success : false,
                    error : "อีเมลล์นี้มีอยู่แล้วในระบบไม่สามารถใช้ได้"
                })
            }
            if (user) {
                res.json({
                    success : true,
                    error : "ท่านเข้าสู่ระบบเรียบร้อยแล้ว"
                })
                token = user.generateJwt();
                res.redirect('/passport/' + token + "/" + user._id);
            }

        })(req, res, next);
    });
    app.post('/api/user/detail', user.getProfile);
    app.get('/api/oauth/facebook/callback', (req, res, next) => {
        passport.authenticate('facebook', (err, user) => {
            if(err) {
                res.redirect('/passport');
            }
            if (user) {
                token = user.generateJwt();
                res.redirect('/passport/' + token + "/" + user._id);
            }

        })(req, res, next);
    });

    
    app.get('/api/send/otp', (req, res) => {
        nexmo.message.sendSms(
            config.nexmo.apiNumber, '66902599621', 1111, {type: 'unicode'},
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              console.dir(responseData);
              // Optional: add socket.io -- will explain later
              res.json({
                  success : true,
                  message : "COMPLETED"
              })
            }
          }
        );
       });


    app.post('/api/test/picture', upload.array('uploads'), function (req, res) {
        //console.log('files', req.files);
        var Data = JSON.parse(req.body.data);
        console.log(Data.name);
        console.log(req.files);
        res.send(req.files);
        
      });
    

}