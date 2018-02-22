const Nexmo = require('nexmo');
const config = require('./env/development');

exports.nexmo = new Nexmo({
    apiKey: config.nexmo.apiKey,
    apiSecret: config.nexmo.apiSecret,
  }, {debug: true});