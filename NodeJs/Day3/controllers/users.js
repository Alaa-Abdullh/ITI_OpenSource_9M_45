


const usermodel=require('../models/users')

exports.getall= async(req, res) => {
    try {
      
    res.json([])
      
    } catch (error) {
      res.status(422).json({status:'faild',message:error.message})
    }
    
    
    }


exports.post=async (req, res) => {
    try {
      const { username, password, firstName, lastName } = req.body;
      if (!username || !password || !firstName || !lastName) {
        return res.status(422).json({
            status: 'failed',
            message: 'All fields (username, password, firstName, lastName) are required'
        });
    }
      let user= await usermodel.create(req.body);
    res.status(200).json({
      status:'sucess',
      data:user
    })
      
    } catch (error) {
      res.status(422).json({status:'faild',message:error.message})
    }
    
    }
  
  exports.patch=async (req, res) => {
    const { id } = req.params;
      
      try {
        
        let user= await usermodel.findById(id);
        if (!user) {
          res.status(404).json({
            status:'faikd',
            message:"not found "
          })
        }
      
  
        const updateuser=await user.save();
      res.status(200).json({
        status:'sucess',
        message:"todo updated",
        data:updateuser
      })
        
      } catch (error) {
        res.status(422).json({status:'faild',message:error.message})
      }
  
  }
  
  
  exports.deleteall=async (req, res) => {
      const { id } = req.params;
  
      try {
        
        let user= await usermodel.findByIdAndDelete(id);
        if (!user) {
          res.status(404).json({
            status:'faikd',
            message:"not found "
          })
        }
        
      res.status(200).json({
        status:'sucess',
        message:"todo deleted",
        data:updatetodo
      })
        
      } catch (error) {
        res.status(422).json({status:'faild',message:error.message})
      }
  
  }

  