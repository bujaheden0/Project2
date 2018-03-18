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
    }
})

mongoose.model('Reserve', reserveSchema);