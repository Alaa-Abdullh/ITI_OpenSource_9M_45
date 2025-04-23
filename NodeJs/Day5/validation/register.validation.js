const joi = require('joi')

let registerschema=joi.object({
    username: {
      type: joi.string().required(),
      minLength: 3,
      maxLength: 50
    },
    email:joi.string().required().pattern(new RegExp("^[a-zA-z]{3,10}(@)(gmail|yahoo)(.com)$")),

    password:joi.string().required(),
    role: joi.string().valid("admin",'user').default('user')
     
  })

  module.exports=registerschema