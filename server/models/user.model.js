const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;
const userSchema = new schema({
    firstname : String,
    lastname  : String,
    username  : {
        type     : String,
        unique   : true
    },
    password  : String,
    email :  {
        type : String,
        unique  : true
    },
});

mongoose.model('User', userSchema);