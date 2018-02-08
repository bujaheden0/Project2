const express    = require('express');
const morgan     = require('morgan');
const path       = require('path');
const bodyParser = require('body-parser');
//const cors       = require('cors');
module.exports = function(){

    const app  = express();
    app.use(morgan('dev'));
    //app.use(cors());
    app.use(express.static(path.join(__dirname,'../.././dist')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));
    require('../routes/user.route')(app);
    return app;


}