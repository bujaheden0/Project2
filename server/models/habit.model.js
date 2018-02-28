const mongoose = require('mongoose');
const schema = mongoose.Schema;
const habitSchema = new schema({
    habit : {
        type : String,
        unique : true
    },
    match_type : {
        perfect : [],
        possible : [],
        least : []
    }
});

mongoose.model('Habit', habitSchema);