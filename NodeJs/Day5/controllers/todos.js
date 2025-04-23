
const fs = require('fs');
const todomodel = require('../models/todos');
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getall = catchAsync(
  async (req, res) => {
   
  
      let todos = await todomodel.find().populate('userId')
      res.status(200).json({
        status: 'sucess',
        data: todos
      })
  
    } 
  
)


exports.getbyid = catchAsync(
  async (req, res ,next) => {

    const { id } = req.params;
    let todo = await todomodel.findById(id)
    if (!todo) {
      return next(new AppError(404,"todo not found"))

    }
    res.status(200).json({
      status: 'sucess',
      data: todo
    })


  }

)


exports.postall = catchAsync(
  async (req, res) => {
   
      let newtodo = req.body;
      let todo = await todomodel.create({ ...newtodo, userId: req.id });
      res.status(200).json({
        status: 'sucess',
        data: todo
      })
  
    }
  
)
