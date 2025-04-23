
const fs = require('fs');
const todomodel=require('../models/todos')

exports.getall= async(req, res) => {
try {
  const { limit = 10, skip = 0 } = req.query;
  let todos= await todomodel.find().populate('userId').limit(Number(limit)).skip(Number(skip));
res.status(200).json({
  status:'sucess',
  data:todos
})
  
} catch (error) {
  res.status(422).json({status:'faild',message:error.message})
}


}



exports.getbyid= async (req, res) => {

    const { id } = req.params;
    try {
  
      let todo= await todomodel.findById(id)
      if (!todo) {
        return   res.status(200).json({
          status:'faild',
          data:todo
        })
        
      }
      res.status(200).json({
        status:'sucess',
        data:todo
      })
        
      
    } catch (error) {
      res.status(422).json({status:'faild',message:error.message})
    }
    

    
}


exports.postall=async (req, res) => {
try {
  let newtodo = req.body;
  let todo= await todomodel.create(newtodo);
res.status(200).json({
  status:'sucess',
  data:todo
})
  
} catch (error) {
  res.status(422).json({status:'faild',message:error.message})
}

}


exports.patch=async (req, res) => {
  const { id } = req.params;
    const { title, status } = req.body;
    
    try {
      
      let todo= await todomodel.findById(id);
      if (!todo) {
        res.status(404).json({
          status:'faikd',
          message:"not found "
        })
      }
      if (title) todo.title=title;
      if(status) todo.status=status;

      const updatetodo=await todo.save();
    res.status(200).json({
      status:'sucess',
      message:"todo updated",
      data:updatetodo
    })
      
    } catch (error) {
      res.status(422).json({status:'faild',message:error.message})
    }

}
exports.deleteall = async (req, res) => {
  const { id } = req.params;

  try {
    let todo = await todomodel.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        status: 'faild',
        message: "Todo not found"
      });
    }

    res.status(200).json({
      status: 'success',
      message: "Todo deleted successfully",
      data: todo
    });
    
  } catch (error) {
    res.status(422).json({ status: 'faild', message: error.message });
  }
};


exports.getUserTodos = async (req, res) => {
  const { userId } = req.params;
  try {
      const todos = await todomodel.find({ userId }).populate('userId');
      res.status(200).json({
          status: 'success',
          data: todos
      });
  } catch (error) {
      res.status(422).json({ status: 'failed', message: error.message });
  }
};