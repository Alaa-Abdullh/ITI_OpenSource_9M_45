// router
const express=require('express');
const router = express.Router();
const{getall,post,patch,deleteall}=require('../controllers/users')


router.get('/',getall );

router.post('/',post );

router.patch('/:id',patch );


router.delete('/:id',deleteall );


module .exports=router;