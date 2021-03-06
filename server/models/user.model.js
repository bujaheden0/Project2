const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema;
const userSchema = new schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    tel: {
        type: String,
        unique: true,
        defaule: ""
    },
    verify: {
        type: Boolean,
        default: false

    },
    details: {
        religion: {
            type: String,
            default: ""
        },
        r_status: {
            type: Boolean,
            default: false
        },
        gender: {
            type: String,
            default: ""
        },
        g_status: {
            type: Boolean,
            default: false
        },
        birthDate: {
            type: String,
            default: ""
        },
        b_status: {
            type: Boolean,
            default: false
        },
        b_range: {
            type: Number,
            default: 0
        },
        facebook: {
            type: String,
            default: ""
        },
        occupation: {
            type: String,
            default: ""
        },
        sleep_time: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        hobbies: {
            type: String,
            default: ""
        },
        descriptions: {
            type: String,
            default: ""
        },
        descriptionsEx: {
            c1: {
                type: Boolean,
                default: false
            },
            c2: {
                type: Boolean,
                default: false
            },
            c3: {
                type: Boolean,
                default: false
            },
            c4: {
                type: Boolean,
                default: false
            },
            c5: {
                type: Boolean,
                default: false
            }
        },// เพื่อน เพื่มเจ้าตัวนี้ให้หน่อยจิ จะเอาไปเช็คบล๊อค
        price: {
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 10000
            }
        }
    },
    habit: {
        type: String,
        default: ""
    },
    profile_picture : {
        type: String,
        default : ""
    },
    providerId: {
        type: String,
        default: ""
    },
    provider: {
        type: String,
        default: ""
    },
    providerData: {},
    profile_status: {
        type: Boolean,
        default: false
    },
    matchedStatus : Boolean
});


userSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = bcrypt.genSaltSync(10);
        this.hash = bcrypt.hashSync(this.password, this.salt);
        this.password = this.hash;
    }
    next();
});

userSchema.methods.verifyPassword = function (candidatePassword, hash) {
    return bcrypt.compareSync(candidatePassword, hash);
}

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.firstname + " " + this.lastname,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

userSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    const possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) callback(possibleUsername);
            else return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
        } else {
            callback(null);
        }
    }
    )
}

mongoose.model('User', userSchema);