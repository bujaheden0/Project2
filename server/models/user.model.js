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
    details : {
        religion : {
            type: String,
            default : ""
        },
        r_status : {
            type : Boolean,
            default : false
        },
        gender : {
            type : String,
            default : ""
        },
        g_status : {
            type : Boolean,
            default : false
        },
        birthDate : {
            type  : String,
            default : ""
        },
        g_status : {
            type : Boolean,
            default : false
        },
        g_range : {
            type : Number,
            default : 0
        },
        facebook : {
            type : String,
            default : ""
        },
        tel : {
            type : String,
            default : ""
        },
        occupation : {
            type : String,
            default : ""
        },
        sleep_time : {
            type : String,
            default : ""
        },
        address : {
            type : String,
            default : ""
        },
        hobbies : {
            type : String,
            default : ""
        },
        descriptions : {
            type : String,
            default : ""
        },
        price : {
            min : {
                type : Number,
                default : 0
            },
            max : {
                type : Number,
                default : 10000
            }
        }
    },
    habit : {
        type : String,
        default : ""
    }

});

mongoose.model('User', userSchema);