// 1)schema model 
const mongoose=require('mongoose');
const userschema=mongoose.Schema({
    username:{
        type:String,
        require:[true,'title is requiers '],
        unique:[true,'must be unique'],
        trim:true,  // remove spacses
        minLength:8,
        maxLength:50 
    },
    email:{
        type:String,
        require:[true,'title is requiers '],
        unique:[true,'must be unique'],
        validate:{
            validator:function (v) {
                return /^[a-zA-z]{3,10}(@)(gmail|yahoo)(.com)$/.test(v) 
            },
            message:()=>"invalid email",
        }

    },
    password:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:[true,'title is requiers '],
        unique:[true,'must be unique'],
        trim:true,  // remove spacses
        minLength:3,
        maxLength:15 
    },
    lastName:{
        type:String,
        require:[true,'title is requiers '],
        unique:[true,'must be unique'],
        trim:true,  // remove spacses
        minLength:3,
        maxLength:15 
    },
    crateAt:Date,
    updateAt:Date,
})

// 2) model
const usermodel=mongoose.model('User',userschema)
module.exports=usermodel;
