// router
const express=require('express');
const router = express.Router();
const{getall,post,login}=require('../controllers/users')


router.get('/',getall );

// register

router.post('/',post );


// login
router.post('/login',login)





module .exports=router;