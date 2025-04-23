// router
const express=require('express');
const {restrictTo,auth}=require('../middlewares/auth');

const router = express.Router();



const{getall,getbyid,deleteall,patch,postall}=require('../controllers/todos')
// const {auth} =require("../middlewares/auth")
router.use(auth)


// GET /todos?limit=5&skip=2
router.get('/',auth,restrictTo('admin','user'),getall );



// GET /todos/:id
router.get('/:id',getbyid);

// POST /todos
router.post('/',postall);

// PATCH /todos/:id
// router.patch('/:id',patch );

// DELETE /todos/:id
// router.delete('/:id',deleteall );


module.exports=router;