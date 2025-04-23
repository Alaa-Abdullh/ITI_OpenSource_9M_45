// 1)schema model 
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const userschema = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'title is requiers '],
        unique: [true, 'must be unique'],
        trim: true,  // remove spacses
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        require: [true, 'title is requiers '],
        unique: [true, 'must be unique'],
        validate: {
            validator: function (v) {
                return /^[a-zA-z]{3,10}(@)(gmail|yahoo)(.com)$/.test(v)
            },
            message: () => "invalid email",
        }

    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

// hasing passwd
userschema.pre('save', async function (next) {
    console.log(this);

    let salt = await bcryptjs.genSalt(10); // 10 complexty
    let hash = await bcryptjs.hash(this.password, salt);
    this.password = hash;
    next();

})



// 2) model
const usermodel = mongoose.model('User', userschema)
module.exports = usermodel;
