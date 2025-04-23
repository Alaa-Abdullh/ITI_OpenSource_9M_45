// 1)schema model 

const mongoose=require('mongoose');
const todosschema=mongoose.Schema({
    title:{
        type:String,
        require:[true,'title is requiers '],
        unique:[true,'must be unique'],
        trim:true,  // remove spacses
        minLength:3,
        maxLength:50 
    },
    status:{
        type:String,
        enum:['todo','in progress','done'],
        default:'todo'

    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    }
})

// 2) model
const todosmodel=mongoose.model('Todo',todosschema)
module.exports=todosmodel;
