


const usermodel=require('../models/users');

const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { user } = require('../routes/todos');

exports.getall= async(req, res) => {
    try {
      
    res.json([])
      
    } catch (error) {
      res.status(422).json({status:'faild',message:error.message})
    }
    
    
    }

    exports.post=async (req, res) => {
      try {
      
        let user= await usermodel.create(req.body);
        let token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.Secret);

      res.status(200).json({
        status:'sucess',
        data:{user,token}
      })
        
      } catch (error) {
        res.status(422).json({status:'faild',message:error.message})
      }
      
      }
    
exports.login=async function (req,res) {
 let {email , password} = req.body
 if (!email || !password)
 {
  res.status(400).json({status:'faild', message: 'Email and password are required'})
  
 }
 let user =await usermodel.findOne({email})
 if (!user)
 {
  res.status(401).json({status:'faild', message: 'User not found' })
  
 }
let isvalid=await bcryptjs.compare(password,user.password);
if (!isvalid) {
  res.status(401).json({status:'faild',message:'Invalid password'})
  
}
let token =jwt.sign({id:user._id,email:user.email},process.env.Secret)
res.status(200).json({status:'success',data:{user,token}})

  
}

