const mongoose = require('mongoose');
const schema = mongoose.Schema;
const dormSchema = new schema({
    name : {
        type : String,
        unique : true
    },
    address : String,
    tel : String,
    electric_unit : Number,
    water_bill : String,
    price : {
        fan_price : Number,
        air_price : Number
    },
    description : String,
    lat : Number,
    long : Number,
    type : String,
    district : String
})

mongoose.model('Dorm', dormSchema);