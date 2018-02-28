const mongoose = require('mongoose');
const schema = mongoose.Schema;
const reserveSchema = new schema({
    user : {
        type : schema.ObjectId,
        ref : 'User'
    },
    dorm : {
        type : schema.ObjectId,
        ref : 'Dorm'
    },
    status : Boolean
})

mongoose.model('Reserve', reserveSchema);