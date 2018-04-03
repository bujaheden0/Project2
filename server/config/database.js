const config   = require('./env/development');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.set('debug', config.debug);
    const db = mongoose.connect(config.mongoUri ,{
        useMongoClient : true
    });
    mongoose.connection.on('connected', () => {
        console.log('Connected to database : ' + config.mongoUri);
    })
    require('../models/user.model');
    require('../models/habit.model');
    require('../models/dorm.model');
    require('../models/reserve.model');
    require('../models/matching.model');
    require('../models/notification.model');
    return db;
}