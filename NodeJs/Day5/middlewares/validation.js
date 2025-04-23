// const { Schema } = require("mongoose");

exports.validation=(Schema)=>{


return (req,res,next)=>{

    let x=Schema.validate({...req.body,...req.params},{abortEarly:false})
    console.log(x.error.details);
    
    if(x.error){
      res.status(422).json({ status: 'faild', message: x.error.details })
  
    }
    else{
        next();

    }
}}