const mongoose = require('mongoose');
const schema = mongoose.Schema;
const matchingSchema = new schema({
    actioner : {
        type : schema.ObjectId,
        ref : 'User' 
    },
    victim : {
        type : schema.ObjectId,
        ref : 'User' 
    },
    status : {
        type : String,
        required : true
    }
})

mongoose.model('Matching', matchingSchema);