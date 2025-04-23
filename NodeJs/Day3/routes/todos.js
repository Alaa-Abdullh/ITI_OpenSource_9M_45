// router
const express=require('express');
const router = express.Router();



const{getall,getbyid,deleteall,patch,postall}=require('../controllers/todos')



// GET /todos?limit=5&skip=2
router.get('/',getall );

// GET /todos/:id
router.get('/:id',getbyid);

// POST /todos
router.post('/',postall );

// PATCH /todos/:id
router.patch('/:id',patch );

// DELETE /todos/:id
router.delete('/:id',deleteall );


module.exports=router;