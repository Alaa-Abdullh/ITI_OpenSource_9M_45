
const fs = require('fs');
const todomodel=require('../models/todos')

exports.getall= async(req, res) => {
try {
  
  let todos= await todomodel.find().populate('userId')
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


// exports.patch=(req, res) => {
//     const { id } = req.params;
//     const { title, status } = req.body;

//     fs.readFile('data.json', 'utf-8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error reading todos', status: 'error' });
//         }

//         let todos = JSON.parse(data);
//         const todoIndex = todos.findIndex(t => t.id === Number(id));

//         if (todoIndex === -1) {
//             return res.status(404).json({ message: 'Todo not found', status: 'error' });
//         }

//         if (title) todos[todoIndex].title = title;
//         if (status) todos[todoIndex].status = status;

//         fs.writeFile('data.json', JSON.stringify(todos, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Error updating todo', status: 'error' });
//             }

//             res.json({
//                 data: todos[todoIndex],
//                 message: 'Todo updated successfully',
//                 status: 'success',
//             });
//         });
//     });
// }


// exports.deleteall=(req, res) => {
//     const { id } = req.params;

//     fs.readFile('data.json', 'utf-8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error reading todos', status: 'error' });
//         }

//         let todos = JSON.parse(data);
//         const todoIndex = todos.findIndex(t => t.id === Number(id));

//         if (todoIndex === -1) {
//             return res.status(404).json({ message: 'Todo not found', status: 'error' });
//         }

//         todos = todos.filter(t => t.id !== Number(id));

//         fs.writeFile('data.json', JSON.stringify(todos, null, 2), (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Error deleting todo', status: 'error' });
//             }

//             res.json({
//                 message: 'Todo deleted successfully',
//                 status: 'success',
//             });
//         });
//     });
// }