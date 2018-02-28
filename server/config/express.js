const express    = require('express');
const morgan     = require('morgan');
const path       = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors       = require('cors');
module.exports = function(){

    const app  = express();
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.static(path.join(__dirname,'../.././dist')));
    app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: true
    }))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));
    app.use(passport.initialize());
    app.use(passport.session());
    require('./passport')(passport);
    require('../routes/user.route')(app);
    require('../routes/verify.route')(app);
    require('../routes/habit.route')(app);
    require('../routes/user-match.route')(app);
    return app;


}