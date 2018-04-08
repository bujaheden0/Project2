const mongoose = require('mongoose');
const schema = mongoose.Schema;
const notificationSchema = new schema({
    sender : {
        type : schema.ObjectId,
        ref : 'User'
    },
    reciever : {
        type : schema.ObjectId,
        ref : 'User'
    },
    message : {
        type : String,
        require : true
    },
    type : {
        type : Number
    },
    read : Boolean
})

mongoose.model('Notification', notificationSchema);