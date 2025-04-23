// router
const express=require('express');
const router = express.Router();
const{getall,post,login}=require('../controllers/users');
const { validation } = require('../middlewares/validation');
const registerschema = require('../validation/register.validation');


router.get('/',getall );

// register

router.post('/',validation(registerschema),post );


// login
router.post('/login',login)





module .exports=router;